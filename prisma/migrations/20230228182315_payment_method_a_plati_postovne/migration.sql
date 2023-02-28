/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Payment_method" AS ENUM ('dobirka', 'prevodem', 'hotove');

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "plati_postovne" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "payment_method" "Payment_method" DEFAULT 'prevodem';

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_key" ON "Branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
