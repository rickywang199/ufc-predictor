/*
  Warnings:

  - You are about to drop the column `fighterStatsId` on the `Fighter` table. All the data in the column will be lost.
  - You are about to drop the `FighterStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrapplingStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StrikingStats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[avgFighterStatsId]` on the table `Fighter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avgFighterStatsId` to the `Fighter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MethodOfVictory" AS ENUM ('KO_TKO', 'UNANIMOUS_DECISION', 'SPLIT_DECISION', 'SUBMISSION');

-- DropForeignKey
ALTER TABLE "Fighter" DROP CONSTRAINT "Fighter_fighterStatsId_fkey";

-- DropForeignKey
ALTER TABLE "FighterStats" DROP CONSTRAINT "FighterStats_grapplingStatsId_fkey";

-- DropForeignKey
ALTER TABLE "FighterStats" DROP CONSTRAINT "FighterStats_strikingStatsId_fkey";

-- DropIndex
DROP INDEX "Fighter_fighterStatsId_key";

-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "fighterStatsId",
ADD COLUMN     "avgFighterStatsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "FighterStats";

-- DropTable
DROP TABLE "GrapplingStats";

-- DropTable
DROP TABLE "StrikingStats";

-- CreateTable
CREATE TABLE "FightResults" (
    "id" TEXT NOT NULL,
    "fighter1Id" TEXT NOT NULL,
    "fighter2Id" TEXT NOT NULL,
    "fighterStatus1" "fightStatus" NOT NULL,
    "fighterStatus2" "fightStatus" NOT NULL,
    "fightName" TEXT NOT NULL,
    "fightBout" TEXT NOT NULL,
    "fightWeightClass" TEXT NOT NULL,
    "methodOfVictory" "MethodOfVictory" NOT NULL,
    "roundsLasted" INTEGER NOT NULL,
    "roundsScheduled" INTEGER NOT NULL,

    CONSTRAINT "FightResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerFightStats" (
    "id" TEXT NOT NULL,
    "fighterId" TEXT NOT NULL,
    "fightResultsId" TEXT NOT NULL,
    "perStrikingStatsId" TEXT NOT NULL,
    "perGrapplingStatsId" TEXT NOT NULL,

    CONSTRAINT "PerFightStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerStrikingStats" (
    "id" TEXT NOT NULL,
    "kd" INTEGER NOT NULL,
    "sigStr" INTEGER NOT NULL,
    "sigStrPct" DOUBLE PRECISION NOT NULL,
    "totalStr" INTEGER NOT NULL,
    "headStr" INTEGER NOT NULL,
    "bodyStr" INTEGER NOT NULL,
    "legStr" INTEGER NOT NULL,
    "distanceStr" INTEGER NOT NULL,
    "clinchStr" INTEGER NOT NULL,
    "groundStr" INTEGER NOT NULL,
    "sigStrAbsorbedPct" DOUBLE PRECISION NOT NULL,
    "sigStrAbs" INTEGER NOT NULL,
    "headAbs" INTEGER NOT NULL,
    "bodyAbs" INTEGER NOT NULL,
    "legAbs" INTEGER NOT NULL,
    "kdReceived" INTEGER NOT NULL,

    CONSTRAINT "PerStrikingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerGrapplingStats" (
    "id" TEXT NOT NULL,
    "td" INTEGER NOT NULL,
    "tdPct" DOUBLE PRECISION NOT NULL,
    "subAtt" INTEGER NOT NULL,
    "reversals" INTEGER NOT NULL,
    "controlTimeSec" INTEGER NOT NULL,
    "tdAbsorbed" INTEGER NOT NULL,
    "tdDefPct" INTEGER NOT NULL,
    "subAttReceived" INTEGER NOT NULL,
    "reversalsGiven" INTEGER NOT NULL,
    "timeControlled" INTEGER NOT NULL,

    CONSTRAINT "PerGrapplingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvgFighterStats" (
    "id" TEXT NOT NULL,
    "avgStrikingStatsId" TEXT NOT NULL,
    "avgGrapplingStatsId" TEXT NOT NULL,

    CONSTRAINT "AvgFighterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvgStrikingStats" (
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

    CONSTRAINT "AvgStrikingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvgGrapplingStats" (
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

    CONSTRAINT "AvgGrapplingStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerFightStats_perStrikingStatsId_key" ON "PerFightStats"("perStrikingStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PerFightStats_perGrapplingStatsId_key" ON "PerFightStats"("perGrapplingStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "AvgFighterStats_avgStrikingStatsId_key" ON "AvgFighterStats"("avgStrikingStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "AvgFighterStats_avgGrapplingStatsId_key" ON "AvgFighterStats"("avgGrapplingStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Fighter_avgFighterStatsId_key" ON "Fighter"("avgFighterStatsId");

-- AddForeignKey
ALTER TABLE "Fighter" ADD CONSTRAINT "Fighter_avgFighterStatsId_fkey" FOREIGN KEY ("avgFighterStatsId") REFERENCES "AvgFighterStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightResults" ADD CONSTRAINT "FightResults_fighter1Id_fkey" FOREIGN KEY ("fighter1Id") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightResults" ADD CONSTRAINT "FightResults_fighter2Id_fkey" FOREIGN KEY ("fighter2Id") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerFightStats" ADD CONSTRAINT "PerFightStats_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerFightStats" ADD CONSTRAINT "PerFightStats_fightResultsId_fkey" FOREIGN KEY ("fightResultsId") REFERENCES "FightResults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerFightStats" ADD CONSTRAINT "PerFightStats_perStrikingStatsId_fkey" FOREIGN KEY ("perStrikingStatsId") REFERENCES "PerStrikingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerFightStats" ADD CONSTRAINT "PerFightStats_perGrapplingStatsId_fkey" FOREIGN KEY ("perGrapplingStatsId") REFERENCES "PerGrapplingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvgFighterStats" ADD CONSTRAINT "AvgFighterStats_avgStrikingStatsId_fkey" FOREIGN KEY ("avgStrikingStatsId") REFERENCES "AvgStrikingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvgFighterStats" ADD CONSTRAINT "AvgFighterStats_avgGrapplingStatsId_fkey" FOREIGN KEY ("avgGrapplingStatsId") REFERENCES "AvgGrapplingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
