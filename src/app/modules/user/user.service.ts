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

  await prisma.subject.findUniqueOrThrow({
    where: { id: payload.user.subjectId },
  });

  await prisma.book.findUniqueOrThrow({
    where: {
      id: payload.user.bookId,
      subjectId: payload.user.subjectId,
    },
  });

  const authData = {
    email: payload.user.email,
    password: hashedPassword,
    role: UserRole.USER,
  };

  const otp = generateOTP();
  const firstChapter = await prisma.chapter.findFirst({
    where: { bookId: payload.user.bookId, index: 1 },
    select: { id: true },
  });
  const firstLesson = await prisma.lesson.findFirst({
    where: { chapterId: firstChapter?.id, index: 1 },
    select: { id: true },
  });

  const userPayload = {
    ...payload.user,
  } as any;

  if (firstLesson?.id) {
    userPayload.activeLessonId = firstLesson.id;
  }

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
      update: userPayload,
      create: userPayload,
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
    status: {
      not: UserStatus.PENDING,
    },
  });

  const whereConditions: Prisma.AuthWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const users = await prisma.auth.findMany({
    where: whereConditions,
    select: {
      id: true,
      status: true,
      subscription: {
        select: {
          id: true,
        },
      },
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
            },
          },
        },
      },
      activeQuestion: {
        select: {
          id: true,
        },
      },
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

  // reset heart
  if (
    !user.lastHeartReset ||
    today.toDateString() !== user.lastHeartReset.toDateString()
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: { hearts: 5, lastHeartReset: today },
    });
  }

  return { ...user, rank: behindOf + 1, isPremium: false };
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
  if (payload.bookId) {
    await prisma.book.findUniqueOrThrow({
      where: {
        id: payload.bookId,
      },
    });
  }
  if (payload.bookId) {
    await prisma.book.findUniqueOrThrow({
      where: {
        id: payload.bookId,
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

const updateLastPracticeDate = async (
  email: string,
  payload: { streakFreeze?: boolean }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
    select: {
      lastPracticeDate: true,
      currentStreak: true,
      coins: true,
      totalExercises: true,
      lastStreakFreezeDate: true,
      totalStreakFreeze: true,
    },
  });

  const today = new Date();

  const updateData = {
    lastPracticeDate: today,
    currentStreak: user.currentStreak + 1,
  } as Partial<User>;

  if (payload?.streakFreeze) {
    if (user.lastStreakFreezeDate) {
      const diff = differenceInCalendarDays(today, user.lastStreakFreezeDate);
      if (diff < 7 && user.totalStreakFreeze >= 3) {
        throw new ApiError(
          400,
          "You can only freeze your streak 3 times in a week!"
        );
      } else if (diff >= 7 && user.totalStreakFreeze >= 3) {
        updateData.totalStreakFreeze = 1;
      }
    }
    if (user.coins < 250) {
      throw new ApiError(
        400,
        "You don't have enough coins to freeze your streak!"
      );
    }
  }

  const result = await prisma.$transaction(async tn => {
    if (!user.lastPracticeDate) {
      return await tn.user.update({
        where: { email },
        data: { lastPracticeDate: today, currentStreak: 1 },
      });
    }

    const diff = differenceInCalendarDays(today, user.lastPracticeDate);

    if (diff === 0) return;

    if (diff === 1) {
      if (payload?.streakFreeze) {
        updateData.coins = user.coins - 250;
        updateData.lastStreakFreezeDate = today;
        updateData.totalExercises = (user.totalExercises || 0) + 1;
      }
      return await tn.user.update({
        where: { email },
        data: updateData,
      });
    }

    return await tn.user.update({
      where: { email },
      data: { lastPracticeDate: today, currentStreak: 1 },
    });
  });

  return result;
};

const getUserRanking = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      xp: "desc",
    },
    take: 5,
    select: {
      name: true,
      avatar: {
        select: {
          icon: true,
        },
      },
      xp: true,
    },
  });

  return users;
};

const deleteUser = async (email: string) => {
  const auth = await prisma.auth.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  const result = await prisma.$transaction(async tn => {
    await tn.otp.deleteMany({ where: { email } });
    await tn.subscription.deleteMany({ where: { authId: auth.id } });
    await tn.purchasedAvatar.deleteMany({ where: { authId: auth.id } });
    const user = await tn.user.deleteMany({ where: { email } });
    await tn.auth.deleteMany({ where: { email } });

    return user;
  });

  return result;
};

const updateActiveLessonId = async (activeLessonId: string, email: string) => {
  const result = await prisma.user.update({
    where: {
      email,
    },
    data: {
      activeLessonId,
      totalExercises: { increment: 1 },
    },
  });
  return result;
};

const handleLastLessonCompletion = async (
  authId: string,
  payload: { golds: number; xps: number }
) => {
  const auth = await prisma.auth.findUniqueOrThrow({
    where: { id: authId },
    select: {
      user: {
        select: {
          id: true,
          activeLessonId: true,
          xp: true,
          coins: true,
          totalExercises: true,
        },
      },
    },
  });
  const currentLesson = await prisma.lesson.findUniqueOrThrow({
    where: { id: auth.user?.activeLessonId! },
    select: { chapterId: true, index: true },
  });

  const nextLesson = await prisma.lesson.findFirst({
    where: {
      chapterId: currentLesson.chapterId,
      index: currentLesson.index + 1,
    },
    select: { id: true },
  });

  let nextLessonId = null;
  if (nextLesson) {
    const firstLesson = await prisma.lesson.findFirst({
      where: {
        chapterId: nextLesson.id,
        index: 1,
      },
      select: { id: true },
    });

    nextLessonId = firstLesson ? firstLesson.id : null;
  }

  const userPayload = {
    xp: Number(auth.user!.xp + payload.xps),
    coins: Number(auth.user!.coins + payload.golds),
    totalExercises: Number(auth.user!.totalExercises + 1),
  };

  if (nextLessonId) {
    Object.assign(userPayload, { activeLessonId: nextLessonId });
  }

  const result = await prisma.$transaction(async tn => {
    const updatedUser = await tn.user.update({
      where: {
        id: auth.user?.id!,
      },
      data: userPayload,
    });
    return updatedUser;
  });

  return result;
};

export const userServices = {
  userSignUp,
  getAllUsers,
  getSingleUser,
  getProfile,
  updateProfile,
  updateLastPracticeDate,
  getUserRanking,
  deleteUser,
  updateActiveLessonId,
  handleLastLessonCompletion,
};
