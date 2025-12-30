import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";
import { notificationController } from "./notification.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { notificationDeleteValidation } from "./notification.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.USER, UserRole.ADMIN),
  notificationController.createNotification
);

router.post(
  "/practice-target-complete",
  authorize(UserRole.USER),
  notificationController.practiceTargetComplete
);

router.get(
  "/",
  authorize(UserRole.USER, UserRole.ADMIN),
  notificationController.getNotifications
);

router.delete(
  "/",
  authorize(UserRole.USER, UserRole.ADMIN),
  handleZodValidation(notificationDeleteValidation),
  notificationController.deleteNotifications
);

export const notificationRoutes = router;
