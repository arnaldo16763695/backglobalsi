/*
  Warnings:

  - You are about to drop the column `clientsId` on the `Works` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_clientsId_fkey";

-- AlterTable
ALTER TABLE "Works" DROP COLUMN "clientsId",
ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
