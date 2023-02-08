/*
  Warnings:

  - A unique constraint covering the columns `[nazev_firmy]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ico]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dic]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_nazev_firmy_key" ON "User"("nazev_firmy");

-- CreateIndex
CREATE UNIQUE INDEX "User_ico_key" ON "User"("ico");

-- CreateIndex
CREATE UNIQUE INDEX "User_dic_key" ON "User"("dic");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
