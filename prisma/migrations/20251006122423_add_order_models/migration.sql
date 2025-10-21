-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "stripeSessionId" DROP NOT NULL,
ALTER COLUMN "stripePaymentInetentId" DROP NOT NULL;
