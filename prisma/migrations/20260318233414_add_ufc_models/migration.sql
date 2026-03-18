/*
  Warnings:

  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "fightStatus" AS ENUM ('WON', 'LOST', 'TIED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_applicationID_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_applicationID_fkey";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Note";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "Fighter" (
    "id" TEXT NOT NULL,
    "fighterFirstName" TEXT NOT NULL,
    "fighterLastName" TEXT NOT NULL,
    "fighterNationality" TEXT NOT NULL,
    "fighterStatsId" TEXT NOT NULL,
    "weightClass" TEXT NOT NULL,
    "fighterClass" TEXT NOT NULL,
    "fighterSubClass" TEXT NOT NULL,
    "fighterAge" INTEGER NOT NULL,
    "winRecord" INTEGER NOT NULL,
    "lossRecord" INTEGER NOT NULL,
    "tieRecord" INTEGER NOT NULL,
    "winPct" DOUBLE PRECISION NOT NULL,
    "totalElo" INTEGER NOT NULL,
    "strikingElo" INTEGER NOT NULL,
    "grapplingElo" INTEGER NOT NULL,

    CONSTRAINT "Fighter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FighterStats" (
    "id" TEXT NOT NULL,
    "strikingStatsId" TEXT NOT NULL,
    "grapplingStatsId" TEXT NOT NULL,

    CONSTRAINT "FighterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrikingStats" (
    "id" TEXT NOT NULL,
    "avgKd" DOUBLE PRECISION NOT NULL,
    "avgSigStr" DOUBLE PRECISION NOT NULL,
    "avgSigStrPct" DOUBLE PRECISION NOT NULL,
    "avgTotalStr" DOUBLE PRECISION NOT NULL,
    "avgHeadStr" DOUBLE PRECISION NOT NULL,
    "avgBodyStr" DOUBLE PRECISION NOT NULL,
    "avgLegStr" DOUBLE PRECISION NOT NULL,
    "avgDistanceStr" DOUBLE PRECISION NOT NULL,
    "avgClinchStr" DOUBLE PRECISION NOT NULL,
    "avgGroundStr" DOUBLE PRECISION NOT NULL,
    "avgSigStrAbsorbedPct" DOUBLE PRECISION NOT NULL,
    "avgSigStrAbs" DOUBLE PRECISION NOT NULL,
    "avgHeadAbs" DOUBLE PRECISION NOT NULL,
    "avgBodyAbs" DOUBLE PRECISION NOT NULL,
    "avgLegAbs" DOUBLE PRECISION NOT NULL,
    "avgKdReceived" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StrikingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrapplingStats" (
    "id" TEXT NOT NULL,
    "avgTd" DOUBLE PRECISION NOT NULL,
    "avgTdPct" DOUBLE PRECISION NOT NULL,
    "avgSubAtt" DOUBLE PRECISION NOT NULL,
    "avgReversals" DOUBLE PRECISION NOT NULL,
    "avgControlTimeSec" INTEGER NOT NULL,
    "avgTdAbsorbed" DOUBLE PRECISION NOT NULL,
    "avgTdDefPct" DOUBLE PRECISION NOT NULL,
    "avgSubAttReceived" DOUBLE PRECISION NOT NULL,
    "avgReversalsGiven" DOUBLE PRECISION NOT NULL,
    "avgTimeControlled" INTEGER NOT NULL,

    CONSTRAINT "GrapplingStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fighter_fighterStatsId_key" ON "Fighter"("fighterStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "FighterStats_strikingStatsId_key" ON "FighterStats"("strikingStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "FighterStats_grapplingStatsId_key" ON "FighterStats"("grapplingStatsId");

-- AddForeignKey
ALTER TABLE "Fighter" ADD CONSTRAINT "Fighter_fighterStatsId_fkey" FOREIGN KEY ("fighterStatsId") REFERENCES "FighterStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FighterStats" ADD CONSTRAINT "FighterStats_strikingStatsId_fkey" FOREIGN KEY ("strikingStatsId") REFERENCES "StrikingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FighterStats" ADD CONSTRAINT "FighterStats_grapplingStatsId_fkey" FOREIGN KEY ("grapplingStatsId") REFERENCES "GrapplingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
