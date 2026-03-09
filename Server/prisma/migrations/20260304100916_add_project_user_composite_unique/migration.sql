/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `WebsiteProject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WebsiteProject_id_userId_key" ON "WebsiteProject"("id", "userId");
