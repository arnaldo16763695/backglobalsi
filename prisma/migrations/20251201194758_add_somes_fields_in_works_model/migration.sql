/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `Works` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `Works` table. All the data in the column will be lost.
  - You are about to drop the column `isStarted` on the `Works` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Works" DROP COLUMN "assignedAt",
DROP COLUMN "finishedAt",
DROP COLUMN "isStarted",
DROP COLUMN "startedAt",
ADD COLUMN     "assignedToTechAt" TIMESTAMP(3),
ADD COLUMN     "finishedByTechAt" TIMESTAMP(3),
ADD COLUMN     "isFinishedByTech" BOOLEAN DEFAULT false,
ADD COLUMN     "isStartedByTech" BOOLEAN DEFAULT false,
ADD COLUMN     "startedByTechAt" TIMESTAMP(3);
