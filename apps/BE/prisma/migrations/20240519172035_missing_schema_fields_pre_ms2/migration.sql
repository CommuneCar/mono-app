-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "fromName" TEXT,
ADD COLUMN     "toName" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'super-secret-password';

-- AlterTable
ALTER TABLE "UserRide" ADD COLUMN     "modificationTs" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
