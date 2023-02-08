/*
  Warnings:

  - You are about to drop the column `addressId` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cislo_orient` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cislo_popis` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mesto` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psc` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulice` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cislo_orient` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cislo_popis` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mesto` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psc` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulice` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_contactId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactId_fkey";

-- DropIndex
DROP INDEX "Branch_addressId_key";

-- DropIndex
DROP INDEX "User_addressId_key";

-- DropIndex
DROP INDEX "User_contactId_key";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "addressId",
DROP COLUMN "contactId",
ADD COLUMN     "cislo_orient" TEXT NOT NULL,
ADD COLUMN     "cislo_popis" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mesto" TEXT NOT NULL,
ADD COLUMN     "psc" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL,
ADD COLUMN     "ulice" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
DROP COLUMN "contactId",
ADD COLUMN     "cislo_orient" TEXT NOT NULL,
ADD COLUMN     "cislo_popis" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mesto" TEXT NOT NULL,
ADD COLUMN     "psc" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL,
ADD COLUMN     "ulice" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Contact";
