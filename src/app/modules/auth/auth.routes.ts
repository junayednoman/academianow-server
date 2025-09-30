import { Router } from "express";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { verifyOtpZod } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/verify-otp",
  handleZodValidation(verifyOtpZod),
  authController.verifyOtp
);

export const authRoutes = router;
