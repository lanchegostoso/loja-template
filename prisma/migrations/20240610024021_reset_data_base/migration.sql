/*
  Warnings:

  - Added the required column `paymentType` to the `PaymentUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentUser" ADD COLUMN     "paymentType" TEXT NOT NULL,
ALTER COLUMN "active" DROP DEFAULT,
ALTER COLUMN "paymentDescription" DROP DEFAULT,
ALTER COLUMN "paymentStatus" DROP DEFAULT;
