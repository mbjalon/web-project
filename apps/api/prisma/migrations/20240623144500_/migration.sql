/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
