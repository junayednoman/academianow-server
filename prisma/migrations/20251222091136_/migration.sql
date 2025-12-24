-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "lastStreakFreezeDate" TIMESTAMP(3),
ADD COLUMN     "totalStreakFreeze" INTEGER NOT NULL DEFAULT 0;
