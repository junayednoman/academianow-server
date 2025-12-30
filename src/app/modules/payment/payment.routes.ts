import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";
import { paymentController } from "./payment.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { paymentSchema } from "./payment.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.USER),
  handleZodValidation(paymentSchema),
  paymentController.createPayment
);

export const paymentRoutes = router;
