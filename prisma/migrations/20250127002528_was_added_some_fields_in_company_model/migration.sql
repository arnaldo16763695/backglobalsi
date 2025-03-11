/*
  Warnings:

  - A unique constraint covering the columns `[rut]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `observations` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rut` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "observations" TEXT NOT NULL,
ADD COLUMN     "rut" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_rut_key" ON "Company"("rut");
