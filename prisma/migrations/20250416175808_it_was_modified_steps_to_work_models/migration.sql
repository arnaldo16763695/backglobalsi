/*
  Warnings:

  - A unique constraint covering the columns `[worksId,description]` on the table `StepsToWork` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StepsToWork_worksId_description_key" ON "StepsToWork"("worksId", "description");
