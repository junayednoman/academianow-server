-- CreateTable
CREATE TABLE "public"."Legal" (
    "id" TEXT NOT NULL,
    "about" TEXT NOT NULL DEFAULT '',
    "termsConditions" TEXT NOT NULL DEFAULT '',
    "privacyPolicy" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Legal_pkey" PRIMARY KEY ("id")
);
