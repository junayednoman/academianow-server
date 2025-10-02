/*
  Warnings:

  - You are about to drop the column `name` on the `avatars` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."avatars_name_key";

-- AlterTable
ALTER TABLE "public"."avatars" DROP COLUMN "name";
