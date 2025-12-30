/*
  Warnings:

  - You are about to drop the column `status` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."PaymentStatus";
