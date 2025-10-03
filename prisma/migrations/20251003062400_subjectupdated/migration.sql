/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."subjects" ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subjects_index_key" ON "public"."subjects"("index");
