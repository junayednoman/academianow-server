/*
  Warnings:

  - You are about to drop the column `currentStreakDays` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "currentStreakDays",
ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastPracticeDate" TIMESTAMP(3);
