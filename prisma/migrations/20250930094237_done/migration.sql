/*
  Warnings:

  - You are about to drop the column `isVerified` on the `auths` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `otps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."auths" DROP COLUMN "isVerified",
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."otps" DROP COLUMN "isVerified";
