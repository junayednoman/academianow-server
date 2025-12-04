import { Router } from "express";
import { lessonController } from "./lesson.controller";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";
import { upload } from "../../utils/awss3";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { lessonZod } from "./lesson.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  upload.single("explanation"),
  handleZodValidation(lessonZod, { formData: true }),
  lessonController.createLesson
);
router.get(
  "/:chapterId",
  authorize(UserRole.USER, UserRole.ADMIN),
  lessonController.getLessonsByChapter
);
router.get(
  "/single/:id",
  authorize(UserRole.USER, UserRole.ADMIN),
  lessonController.getSingleLesson
);
router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  upload.single("explanation"),
  handleZodValidation(lessonZod.partial(), { formData: true }),
  lessonController.updateLesson
);
router.delete("/:id", authorize(UserRole.ADMIN), lessonController.deleteLesson);

export const lessonRoutes = router;
