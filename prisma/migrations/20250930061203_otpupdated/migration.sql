/*
  Warnings:

  - You are about to drop the column `authId` on the `otps` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `otps` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."otps" DROP CONSTRAINT "otps_authId_fkey";

-- DropIndex
DROP INDEX "public"."otps_authId_key";

-- AlterTable
ALTER TABLE "public"."otps" DROP COLUMN "authId",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "otps_email_key" ON "public"."otps"("email");

-- AddForeignKey
ALTER TABLE "public"."otps" ADD CONSTRAINT "otps_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."auths"("email") ON DELETE SET NULL ON UPDATE CASCADE;
