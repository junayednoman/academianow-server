import { Router } from "express";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { loginZodSchema, verifyOtpZod } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  handleZodValidation(loginZodSchema),
  authController.login
);

router.post(
  "/verify-otp",
  handleZodValidation(verifyOtpZod),
  authController.verifyOtp
);

router.post(
  "/send-otp",
  authController.sendOtp
);

export const authRoutes = router;
