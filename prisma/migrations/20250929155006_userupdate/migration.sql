-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_activeLessonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_activeQuestionId_fkey";

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "signUpSource" DROP NOT NULL,
ALTER COLUMN "activeQuestionId" DROP NOT NULL,
ALTER COLUMN "activeLessonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_activeQuestionId_fkey" FOREIGN KEY ("activeQuestionId") REFERENCES "public"."questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_activeLessonId_fkey" FOREIGN KEY ("activeLessonId") REFERENCES "public"."lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
