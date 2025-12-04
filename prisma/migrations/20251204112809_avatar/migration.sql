-- AlterTable
ALTER TABLE "public"."avatars" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."PurchasedAvatar" (
    "id" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasedAvatar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PurchasedAvatar" ADD CONSTRAINT "PurchasedAvatar_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "public"."avatars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasedAvatar" ADD CONSTRAINT "PurchasedAvatar_authId_fkey" FOREIGN KEY ("authId") REFERENCES "public"."auths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
