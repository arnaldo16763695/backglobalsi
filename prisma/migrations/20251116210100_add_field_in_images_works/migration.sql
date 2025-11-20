/*
  Warnings:

  - Added the required column `imageKey` to the `ImagesWorks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ImagesWorks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImagesWorks" ADD COLUMN     "imageKey" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImagesWorks" ADD CONSTRAINT "ImagesWorks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
