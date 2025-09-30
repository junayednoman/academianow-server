-- CreateTable
CREATE TABLE "public"."otps" (
    "id" TEXT NOT NULL,
    "authId" TEXT,
    "otp" TEXT NOT NULL,
    "otpExpires" TIMESTAMP(3) NOT NULL,
    "otpAttempts" INTEGER NOT NULL,
    "isOtpVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otps_authId_key" ON "public"."otps"("authId");

-- AddForeignKey
ALTER TABLE "public"."otps" ADD CONSTRAINT "otps_authId_fkey" FOREIGN KEY ("authId") REFERENCES "public"."auths"("id") ON DELETE SET NULL ON UPDATE CASCADE;
