-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('pcs', 'kg');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shelf" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "goodId" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "shelfId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "storageDate" TIMESTAMP(3) NOT NULL,
    "stockedById" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_row_position_level_key" ON "Shelf"("row", "position", "level");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "Shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_stockedById_fkey" FOREIGN KEY ("stockedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
