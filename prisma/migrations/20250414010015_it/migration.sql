/*
  Warnings:

  - You are about to drop the column `code` on the `Works` table. All the data in the column will be lost.
  - Added the required column `workCode` to the `Works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Works" DROP COLUMN "code",
ADD COLUMN     "workCode" TEXT NOT NULL;
