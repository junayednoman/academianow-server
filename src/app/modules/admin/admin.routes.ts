import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../../generated/prisma";
import { adminController } from "./admin.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { profileUpdateZod } from "./admin.validation";
import { upload } from "../../utils/awss3";

const router = Router();

router.get("/profile", authorize(UserRole.ADMIN), adminController.getProfile);
router.patch(
  "/",
  authorize(UserRole.ADMIN),
  upload.single("image"),
  handleZodValidation(profileUpdateZod, { formData: true }),
  adminController.updateProfile
);

export const adminRoutes = router;
