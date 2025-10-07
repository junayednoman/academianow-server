import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import ApiError from "../../middlewares/classes/ApiError";
import prisma from "../../utils/prisma";
import { TSignUpInput } from "./user.validation";
import bcrypt from "bcrypt";
import generateOTP from "../../utils/generateOTP";
import { sendEmail } from "../../utils/sendEmail";
import {
  calculatePagination,
  TOptions,
} from "../../utils/paginationCalculation";
import { authSearchAbleFields } from "./user.constant";
import { differenceInCalendarDays } from "date-fns";

const userSignUp = async (payload: TSignUpInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const existingUser = await prisma.auth.findUnique({
    where: {
      email: payload.user.email,
      OR: [
        { status: UserStatus.ACTIVE },
        { status: UserStatus.BLOCKED },
        { status: UserStatus.DELETED },
      ],
    },
  });

  if (existingUser)
    throw new ApiError(400, "User already exists with this email!");

  const authData = {
    email: payload.user.email,
    password: hashedPassword,
    role: UserRole.USER,
  };

  const otp = generateOTP();
  const result = await prisma.$transaction(async tn => {
    await tn.auth.upsert({
      where: {
        email: payload.user.email,
      },
      update: authData,
      create: authData,
    });

    const result = await tn.user.upsert({
      where: { email: payload.user.email },
      update: payload.user,
      create: payload.user,
    });

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    const otpExpires = new Date(Date.now() + 3 * 60 * 1000);

    const otpData = {
      email: payload.user.email,
      otp: hashedOtp,
      expires: otpExpires,
      attempts: 0,
    };

    await tn.otp.upsert({
      where: {
        email: payload.user.email,
      },
      update: otpData,
      create: otpData,
    });
    return result;
  });

  // sendEmail
  if (result) {
    const subject = "Complete your signup – verify your email";
    const replacements = {
      name: payload.user.name,
      otp,
    };
    const path = "./src/app/emailTemplates/welcome.html";
    sendEmail(payload.user.email, subject, path, replacements);
  }
  return result;
};

const getAllUsers = async (query: Record<string, any>, options: TOptions) => {
  const { searchTerm, status, type } = query;
  const andConditions: Prisma.AuthWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      user: {
        OR: authSearchAbleFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      },
    });
  }
  if (status) {
    andConditions.push({
      status: status,
    });
  }
  if (type) {
    if (type === "subscriber") {
      andConditions.push({
        NOT: {
          subscription: null,
        },
      });
    }
  } else if (type === "non-subscriber") {
    andConditions.push({
      subscription: null,
    });
  }

  andConditions.push({
    role: UserRole.USER,
  });

  const whereConditions: Prisma.AuthWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const users = await prisma.auth.findMany({
    where: whereConditions,
    select: {
      id: true,
      status: true,
      subscription: true,
      user: {
        select: {
          name: true,
          email: true,
          age: true,
          signUpSource: true,
          createdAt: true,
          avatar: {
            select: {
              icon: true,
            },
          },
        },
      },
    },
    skip,
    take,
    orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { createdAt: "desc" },
  });

  const total = await prisma.auth.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit: take,
    total,
  };
  return { meta, users };
};

const getSingleUser = async (id: string) => {
  const user = await prisma.auth.findUnique({
    where: {
      id: id,
    },
    select: {
      user: true,
    },
  });

  return user;
};

const getProfile = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
    include: {
      avatar: {
        select: {
          icon: true,
        },
      },
      activeLesson: {
        select: {
          id: true,
          name: true,
          chapter: {
            select: {
              id: true,
              name: true,
              book: {
                select: {
                  id: true,
                  name: true,
                  subject: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      activeQuestion: {
        select: {
          id: true,
        },
      },
    },
  });

  // --- streak update logic ---
  const today = new Date();
  const diff = user.lastPracticeDate
    ? differenceInCalendarDays(today, user.lastPracticeDate)
    : null;

  if (diff !== null) {
    if (diff === 1) {
      // consecutive day → increase streak
      user.currentStreak += 1;
    } else if (diff > 1) {
      // missed → reset streak
      user.currentStreak = 0;
    }
    // update DB only if streak changed
    if (diff >= 1) {
      await prisma.user.update({
        where: { email },
        data: {
          lastPracticeDate: today,
          currentStreak: user.currentStreak,
        },
      });
    }
  }

  const behindOf = await prisma.user.count({
    where: { xp: { gt: user.xp } },
  });

  return { ...user, rank: behindOf + 1 };
};

const updateProfile = async (email: string, payload: Partial<User>) => {
  if (payload.avatarId) {
    await prisma.avatar.findUniqueOrThrow({
      where: {
        id: payload.avatarId,
      },
    });
  }
  if (payload.activeLessonId) {
    await prisma.lesson.findUniqueOrThrow({
      where: {
        id: payload.activeLessonId,
      },
    });
  }
  if (payload.activeQuestionId) {
    await prisma.question.findUniqueOrThrow({
      where: {
        id: payload.activeQuestionId,
      },
    });
  }
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: payload,
  });

  return user;
};

const updateLastPracticeDate = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
    select: { lastPracticeDate: true, currentStreak: true },
  });

  const today = new Date();

  if (!user.lastPracticeDate) {
    return prisma.user.update({
      where: { email },
      data: { lastPracticeDate: today, currentStreak: 1 },
    });
  }

  const diff = differenceInCalendarDays(today, user.lastPracticeDate);

  if (diff === 0) return;

  if (diff === 1) {
    return prisma.user.update({
      where: { email },
      data: {
        lastPracticeDate: today,
        currentStreak: user.currentStreak + 1,
      },
    });
  }

  return prisma.user.update({
    where: { email },
    data: { lastPracticeDate: today, currentStreak: 1 },
  });
};

export const userServices = {
  userSignUp,
  getAllUsers,
  getSingleUser,
  getProfile,
  updateProfile,
  updateLastPracticeDate,
};
