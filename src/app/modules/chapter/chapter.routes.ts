import { Router } from "express";
import { chapterController } from "./chapter.controller";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../../generated/prisma";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { chapterZod } from "./chapter.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  handleZodValidation(chapterZod),
  chapterController.createChapter
);

router.get("/:bookId", chapterController.getChaptersByBookId);
router.get("/single/:id", chapterController.getSingleChapter);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  handleZodValidation(chapterZod.partial()),
  chapterController.updateChapter
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  chapterController.deleteChapter
);

export const chapterRoutes = router;
