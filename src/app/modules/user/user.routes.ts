import { Router } from "express";
import { userController } from "./user.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { signUpValidationSchema, updateUserZod } from "./user.validation";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../../generated/prisma";

const router = Router();

router.post(
  "/signup",
  handleZodValidation(signUpValidationSchema),
  userController.userSignUp
);

router.get("/", authorize(UserRole.ADMIN), userController.getAllUsers);
router.get("/:id", authorize(UserRole.ADMIN), userController.getSingleUser);
router.get("/profile", authorize(UserRole.USER), userController.getProfile);

router.patch(
  "/",
  authorize(UserRole.USER),
  handleZodValidation(updateUserZod),
  userController.updateProfile
);

export const userRoutes = router;
