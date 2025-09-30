/*
  Warnings:

  - You are about to drop the column `isOtpVerified` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `otpAttempts` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpires` on the `otps` table. All the data in the column will be lost.
  - Added the required column `expires` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."otps" DROP COLUMN "isOtpVerified",
DROP COLUMN "otpAttempts",
DROP COLUMN "otpExpires",
ADD COLUMN     "attempts" INTEGER DEFAULT 0,
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
