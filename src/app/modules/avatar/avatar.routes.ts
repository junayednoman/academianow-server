import { Router } from "express";
import { avatarController } from "./avatar.controller";
import { upload } from "../../utils/awss3";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { avatarZod } from "./avatar.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  upload.single("icon"),
  handleZodValidation(avatarZod, { formData: true }),
  avatarController.createAvatar
);

router.get("/", avatarController.getAllAvatars);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  upload.single("icon"),
  handleZodValidation(avatarZod.partial(), { formData: true }),
  avatarController.updateAvatar
);

router.delete("/:id", authorize(UserRole.ADMIN), avatarController.deleteAvatar);

export const avatarRoutes = router;
