-- AlterTable
ALTER TABLE "UserRide" ADD COLUMN     "flexibleLocation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passengersCount" INTEGER NOT NULL DEFAULT 1;
