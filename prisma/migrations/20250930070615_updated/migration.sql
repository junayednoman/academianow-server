/*
  Warnings:

  - Made the column `attempts` on table `otps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."otps" ALTER COLUMN "attempts" SET NOT NULL;
