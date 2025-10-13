import { Router } from "express";
import { goldPackageController } from "./goldPackage.controller";
import authorize from "../../middlewares/authorize";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { UserRole } from "@prisma/client";
import { goldPackageZod } from "./goldPackage.validation";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  handleZodValidation(goldPackageZod),
  goldPackageController.createGoldPackage
);

router.get("/", goldPackageController.getAllGoldPackages);
router.get("/:id", goldPackageController.getSingleGoldPackage);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  handleZodValidation(goldPackageZod.partial()),
  goldPackageController.updateGoldPackage
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  goldPackageController.deleteGoldPackage
);

export const goldPackageRoutes = router;
