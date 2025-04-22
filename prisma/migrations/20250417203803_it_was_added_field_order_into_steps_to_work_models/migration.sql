/*
  Warnings:

  - Added the required column `order` to the `StepsToWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StepsToWork" ADD COLUMN     "order" INTEGER NOT NULL;
