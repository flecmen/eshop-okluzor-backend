-- CreateEnum
CREATE TYPE "Orientace" AS ENUM ('PRAVY', 'LEVY', 'UNI');

-- CreateEnum
CREATE TYPE "Barva" AS ENUM ('PRIRODNI', 'SVETLE_RUZOVA', 'CERVENA', 'FIALOVA', 'MODRA', 'ZELENA', 'TYRKYSOVA', 'ZLUTA');

-- CreateEnum
CREATE TYPE "Typ_prisavkove" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "Velikost" AS ENUM ('S', 'L');

-- CreateEnum
CREATE TYPE "Order_status" AS ENUM ('na_ceste', 'odelsano', 'dokonceno');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Customer', 'Admin');

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "mesto" TEXT NOT NULL,
    "ulice" TEXT NOT NULL,
    "cislo_popis" TEXT,
    "cislo_orient" TEXT,
    "psc" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nazev_firmy" TEXT NOT NULL,
    "ico" TEXT NOT NULL,
    "dic" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "tel" TEXT,
    "addressId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Customer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "branch_name" TEXT,
    "email" TEXT,
    "tel" TEXT,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nazev" TEXT NOT NULL,
    "vyrobce" TEXT NOT NULL,
    "popis" TEXT NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,
    "obrazek" BYTEA NOT NULL,
    "dph" INTEGER NOT NULL,
    "pocet_kusu_v_baleni" INTEGER NOT NULL,
    "rozmery" TEXT NOT NULL,
    "s_obrazkem" BOOLEAN NOT NULL,
    "orientace" "Orientace" NOT NULL,
    "barva" "Barva" NOT NULL,
    "typ_prisavkove" "Typ_prisavkove" NOT NULL,
    "velikost" "Velikost" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "time_of_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Order_status" NOT NULL,
    "note" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_item" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "priceAtOrder" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ico_key" ON "User"("ico");

-- CreateIndex
CREATE UNIQUE INDEX "User_dic_key" ON "User"("dic");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_addressId_key" ON "Branch"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
