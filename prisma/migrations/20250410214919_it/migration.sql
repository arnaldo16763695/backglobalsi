/*
  Warnings:

  - You are about to drop the column `title` on the `Works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Works" DROP COLUMN "title",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "finalObservations" DROP NOT NULL;
