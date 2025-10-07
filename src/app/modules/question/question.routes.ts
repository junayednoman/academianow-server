import { Router } from "express";
import { questionController } from "./question.controller";
import authorize from "../../middlewares/authorize";
import { UserRole } from "@prisma/client";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { createQuestionZod, updateQuestionZod } from "./question.validation";
import { upload } from "../../utils/awss3";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  handleZodValidation(createQuestionZod),
  questionController.createQuestion
);

router.get("/:lessonId", questionController.getQuestionsByLesson);
router.get("/single/:id", questionController.getSingleQuestion);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  upload.array("images"),
  handleZodValidation(updateQuestionZod.partial(), { formData: true }),
  questionController.updateQuestion
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  questionController.deleteQuestion
);

router.delete(
  "/image/:id",
  authorize(UserRole.ADMIN),
  questionController.deleteImageFromQuestion
);

export const questionRoutes = router;
