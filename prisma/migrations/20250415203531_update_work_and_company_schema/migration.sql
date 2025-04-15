/*
  Warnings:

  - A unique constraint covering the columns `[workCode]` on the table `Works` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clientsId` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Works` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "clientsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Works" ALTER COLUMN "companyId" SET NOT NULL;

-- CreateTable
CREATE TABLE "WorkTechnician" (
    "workId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkTechnician_pkey" PRIMARY KEY ("workId","technicianId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Works_workCode_key" ON "Works"("workCode");

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTechnician" ADD CONSTRAINT "WorkTechnician_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTechnician" ADD CONSTRAINT "WorkTechnician_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
