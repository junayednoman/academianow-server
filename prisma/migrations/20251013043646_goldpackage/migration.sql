-- CreateTable
CREATE TABLE "public"."gold_packages" (
    "id" TEXT NOT NULL,
    "golds" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gold_packages_pkey" PRIMARY KEY ("id")
);
