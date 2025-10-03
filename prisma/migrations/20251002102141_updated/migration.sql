/*
  Warnings:

  - You are about to drop the column `userId` on the `subscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- DropIndex
DROP INDEX "public"."subscriptions_userId_key";

-- AlterTable
ALTER TABLE "public"."subscriptions" DROP COLUMN "userId",
ADD COLUMN     "authId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_authId_key" ON "public"."subscriptions"("authId");

-- AddForeignKey
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_authId_fkey" FOREIGN KEY ("authId") REFERENCES "public"."auths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
