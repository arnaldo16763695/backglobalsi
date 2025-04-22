/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_worksId_fkey";

-- AlterTable
ALTER TABLE "StepsToWork" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "ImagesStepToWork" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stepsToWorkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagesStepToWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesWorks" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "worksId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagesWorks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StepsToWork" ADD CONSTRAINT "StepsToWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesStepToWork" ADD CONSTRAINT "ImagesStepToWork_stepsToWorkId_fkey" FOREIGN KEY ("stepsToWorkId") REFERENCES "StepsToWork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesWorks" ADD CONSTRAINT "ImagesWorks_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
