-- AlterTable
ALTER TABLE "PaymentUser" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "paymentDescription" TEXT NOT NULL DEFAULT 'Retiro Resgatando Anas 2024',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';
