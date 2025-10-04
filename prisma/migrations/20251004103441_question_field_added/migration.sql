/*
  Warnings:

  - Added the required column `question` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."questions" ADD COLUMN     "question" TEXT NOT NULL;
