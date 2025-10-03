import { Router } from "express";
import { bookController } from "./book.controller";
import { upload } from "../../utils/awss3";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../../generated/prisma";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { bookZod } from "./book.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  upload.single("image"),
  handleZodValidation(bookZod, { formData: true }),
  bookController.createBook
);

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getSingleBook);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  upload.single("image"),
  handleZodValidation(bookZod.partial(), { formData: true }),
  bookController.updateBook
);

router.delete("/:id", authorize(UserRole.ADMIN), bookController.deleteBook);

export const bookRoutes = router;
