-- CreateEnum
CREATE TYPE "StatusSteps" AS ENUM ('PENDING', 'FINISHED');

-- AlterTable
ALTER TABLE "StepsToWork" ADD COLUMN     "status" "StatusSteps" NOT NULL DEFAULT 'PENDING';
