/*
  Warnings:

  - You are about to drop the column `loginProvider` on the `auths` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."auths" DROP COLUMN "loginProvider",
ADD COLUMN     "provider" "public"."LoginProvider" NOT NULL DEFAULT 'CREDENTIAL';
