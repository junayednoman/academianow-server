import { Router } from "express";
import { userController } from "./user.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { signUpValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  handleZodValidation(signUpValidationSchema),
  userController.userSignUp
);

export const userRoutes = router;
