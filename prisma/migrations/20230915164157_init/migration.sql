-- CreateTable
CREATE TABLE "heroes" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "originDescription" TEXT NOT NULL,
    "superpowers" TEXT[],
    "catchPhrase" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "heroes_nickname_key" ON "heroes"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "heroes_realName_key" ON "heroes"("realName");
