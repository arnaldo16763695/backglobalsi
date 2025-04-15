/*
  Warnings:

  - Added the required column `code` to the `Works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Works" ADD COLUMN     "code" TEXT NOT NULL;
