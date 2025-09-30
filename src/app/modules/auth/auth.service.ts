import { LoginProvider, UserStatus } from "../../../../generated/prisma";
import ApiError from "../../middlewares/classes/ApiError";
import prisma from "../../utils/prisma";
import { sendEmail } from "../../utils/sendEmail";
import { TLoginInput, TVerifyOtpInput } from "./auth.validation";
import bcrypt from "bcrypt";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import config from "../../config";
import generateOTP from "../../utils/generateOTP";

const login = async (payload: TLoginInput) => {
  const auth = await prisma.auth.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (auth.status === UserStatus.PENDING)
    throw new ApiError(400, "Please verify your account!");

  if (auth.provider === LoginProvider.GOOGLE)
    throw new ApiError(400, "Your account was created using Google!");

  const hasMatched = await bcrypt.compare(payload.password, auth.password);
  if (!hasMatched) throw new ApiError(400, "Invalid credentials!");

  // prepare tokens
  const jwtPayload = {
    email: auth.email,
    role: auth.role,
    id: auth.id,
  };

  const accessToken = jsonwebtoken.sign(
    jwtPayload,
    config.jwt.accessSecret as Secret,
    {
      expiresIn: config.jwt.accessExpiration as any,
    }
  );

  const refreshToken = jsonwebtoken.sign(
    jwtPayload,
    config.jwt.refreshSecret as Secret,
    {
      expiresIn: config.jwt.refreshExpiration as any,
    }
  );

  // update fcmToken if any
  if (payload.fcmToken) {
    await prisma.auth.update({
      where: {
        email: payload.email,
      },
      data: {
        fcmToken: payload.fcmToken,
      },
    });
  }

  return {
    accessToken,
    refreshToken,
  };
};

const verifyOtp = async (payload: TVerifyOtpInput) => {
  await prisma.auth.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const otp = await prisma.otp.findUniqueOrThrow({
    where: {
      email: payload.email,
      isVerified: false,
    },
  });

  const hasOtpExpired = otp.expires < new Date();

  if (otp.attempts > 3)
    throw new ApiError(400, "Too many attempts! Please request a new one!");

  if (hasOtpExpired) {
    throw new ApiError(400, "OTP expired! Please request a new one!");
  }

  // Update the OTP attempts
  await prisma.otp.update({
    where: {
      email: payload.email,
    },
    data: {
      attempts: {
        increment: 1,
      },
    },
  });

  const hasMatched = await bcrypt.compare(payload.otp, otp.otp);
  if (!hasMatched) {
    throw new ApiError(400, "Invalid OTP! Please try again!");
  }

  const result = await prisma.$transaction(async tn => {
    if (payload.verifyAccount) {
      const updatedAuth = await tn.auth.update({
        where: {
          email: payload.email,
        },
        data: {
          status: UserStatus.ACTIVE,
        },
        include: {
          user: true,
        },
      });

      await prisma.otp.delete({
        where: {
          email: payload.email,
        },
      });

      // send verification success email
      if (updatedAuth) {
        const subject = "🎉 Welcome to Academianow! Your Email is Verified";
        const name = updatedAuth.user?.name as string;
        const path = "./src/app/emailTemplates/verificationSuccess.html";
        sendEmail(updatedAuth.email, subject, path, { name });
      }
    } else {
      await tn.otp.update({
        where: {
          email: payload.email,
        },
        data: {
          isVerified: true,
        },
      });
    }
  });

  return result;
};

const sendOtp = async (email: string) => {
  const auth = await prisma.auth.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
    select: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  const otpData = {
    email: email,
    otp: hashedOtp,
    expires: otpExpires,
    attempts: 0,
    isVerified: false,
  };

  await prisma.otp.upsert({
    where: {
      email,
    },
    update: otpData,
    create: otpData,
  });

  // send email
  const subject = "Your One-Time Password (OTP) for Password Reset";
  const path = "./src/app/emailTemplates/otp.html";
  sendEmail(email, subject, path, { otp, name: auth.user?.name as string });
};

export const authServices = {
  verifyOtp,
  login,
  sendOtp,
};
