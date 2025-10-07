import { Router } from "express";
import { userController } from "./user.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { signUpValidationSchema, updateUserZod } from "./user.validation";
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

export const userRoutes = router;
