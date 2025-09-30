import { UserStatus } from "../../../../generated/prisma";
import ApiError from "../../middlewares/classes/ApiError";
import prisma from "../../utils/prisma";
import { sendEmail } from "../../utils/sendEmail";
import { TVerifyOtpInput } from "./auth.validation";
import bcrypt from "bcrypt";

const verifyOtp = async (payload: TVerifyOtpInput) => {
  await prisma.auth.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const otp = await prisma.otp.findUniqueOrThrow({
    where: {
      email: payload.email,
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

export const authServices = {
  verifyOtp,
};
