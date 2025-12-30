import { Router } from "express";
import { userController } from "./user.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import {
  handleLastLessonCompletionZod,
  signUpValidationSchema,
  updateActiveLessonIdZod,
  updateUserZod,
} from "./user.validation";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/signup",
  handleZodValidation(signUpValidationSchema),
  userController.userSignUp
);

router.get("/", authorize(UserRole.ADMIN), userController.getAllUsers);
router.get("/ranking", userController.getUserRanking);
router.get("/profile", authorize(UserRole.USER), userController.getProfile);
router.get(
  "/:id",
  authorize(UserRole.ADMIN, UserRole.USER),
  userController.getSingleUser
);

router.patch(
  "/",
  authorize(UserRole.USER),
  handleZodValidation(updateUserZod),
  userController.updateProfile
);

router.patch(
  "/update-practice-date",
  authorize(UserRole.USER),
  userController.updateLastPracticeDate
);

router.patch(
  "/update-active-lesson",
  authorize(UserRole.USER),
  handleZodValidation(updateActiveLessonIdZod),
  userController.updateActiveLessonId
);

router.patch(
  "/handle-last-lesson-completion",
  authorize(UserRole.USER),
  handleZodValidation(handleLastLessonCompletionZod),
  userController.handleLastLessonCompletion
);

router.delete("/", authorize(UserRole.USER), userController.deleteUser);

export const userRoutes = router;
