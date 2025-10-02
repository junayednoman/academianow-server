/*
  Warnings:

  - You are about to drop the column `profileAvatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "profileAvatar",
ADD COLUMN     "avatarId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "public"."avatars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
