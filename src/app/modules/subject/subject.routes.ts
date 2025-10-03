import { Router } from "express";
import { subjectController } from "./subject.controller";
import { upload } from "../../utils/awss3";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../../generated/prisma";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { subjectZod } from "./subject.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  upload.single("image"),
  handleZodValidation(subjectZod, { formData: true }),
  subjectController.createSubject
);

router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSingleSubject);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  upload.single("image"),
  handleZodValidation(subjectZod.partial(), { formData: true }),
  subjectController.updateSubject
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  subjectController.deleteSubject
);

export const subjectRoutes = router;
