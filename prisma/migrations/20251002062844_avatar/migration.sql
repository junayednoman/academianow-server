-- CreateTable
CREATE TABLE "public"."avatars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "avatars_name_key" ON "public"."avatars"("name");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_index_key" ON "public"."avatars"("index");
