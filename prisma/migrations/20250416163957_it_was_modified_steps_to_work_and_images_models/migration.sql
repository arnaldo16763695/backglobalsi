/*
  Warnings:

  - Made the column `stepsToWorkId` on table `ImagesStepToWork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `worksId` on table `ImagesWorks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `worksId` on table `StepsToWork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `StepsToWork` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ImagesStepToWork" DROP CONSTRAINT "ImagesStepToWork_stepsToWorkId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesWorks" DROP CONSTRAINT "ImagesWorks_worksId_fkey";

-- DropForeignKey
ALTER TABLE "StepsToWork" DROP CONSTRAINT "StepsToWork_userId_fkey";

-- DropForeignKey
ALTER TABLE "StepsToWork" DROP CONSTRAINT "StepsToWork_worksId_fkey";

-- AlterTable
ALTER TABLE "ImagesStepToWork" ALTER COLUMN "stepsToWorkId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ImagesWorks" ALTER COLUMN "worksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StepsToWork" ALTER COLUMN "worksId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "StepsToWork" ADD CONSTRAINT "StepsToWork_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepsToWork" ADD CONSTRAINT "StepsToWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesStepToWork" ADD CONSTRAINT "ImagesStepToWork_stepsToWorkId_fkey" FOREIGN KEY ("stepsToWorkId") REFERENCES "StepsToWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesWorks" ADD CONSTRAINT "ImagesWorks_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
