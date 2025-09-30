-- CreateEnum
CREATE TYPE "public"."LoginProvider" AS ENUM ('GOOGLE', 'CREDENTIAL');

-- AlterTable
ALTER TABLE "public"."auths" ADD COLUMN     "loginProvider" "public"."LoginProvider" NOT NULL DEFAULT 'CREDENTIAL';
