/*
  Warnings:

  - You are about to drop the column `org_id` on the `donation_pets` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `donation_pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "donation_pets" DROP CONSTRAINT "donation_pets_org_id_fkey";

-- AlterTable
ALTER TABLE "donation_pets" DROP COLUMN "org_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "donation_pets" ADD CONSTRAINT "donation_pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
