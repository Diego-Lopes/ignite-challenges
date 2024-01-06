/*
  Warnings:

  - You are about to drop the column `password` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donation_pets" ALTER COLUMN "date_donation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "password",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;
