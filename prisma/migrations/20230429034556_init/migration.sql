/*
  Warnings:

  - Added the required column `price` to the `dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dish" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
