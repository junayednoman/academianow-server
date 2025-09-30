import { UserRole, UserStatus } from "../../../../generated/prisma";
import ApiError from "../../middlewares/classes/ApiError";
import prisma from "../../utils/prisma";
import { TSignUpInput } from "./user.validation";
import bcrypt from "bcrypt";
import generateOTP from "../../utils/generateOTP";
import { sendEmail } from "../../utils/sendEmail";

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

export const userServices = {
  userSignUp,
};
