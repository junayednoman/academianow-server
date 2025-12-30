/*
  Warnings:

  - Added the required column `purpose` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentPurpose" AS ENUM ('SUBSCRIPTION', 'GOLD');

-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "purpose" "public"."PaymentPurpose" NOT NULL;
