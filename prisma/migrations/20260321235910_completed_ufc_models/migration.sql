/*
  Warnings:

  - You are about to drop the column `avgFighterStatsId` on the `Fighter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fighterId]` on the table `AvgFighterStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fighterId` to the `AvgFighterStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fighterArmReach` to the `Fighter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fighter" DROP CONSTRAINT "Fighter_avgFighterStatsId_fkey";

-- DropIndex
DROP INDEX "Fighter_avgFighterStatsId_key";

-- AlterTable
ALTER TABLE "AvgFighterStats" ADD COLUMN     "fighterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "avgFighterStatsId",
ADD COLUMN     "fighterArmReach" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AvgFighterStats_fighterId_key" ON "AvgFighterStats"("fighterId");

-- AddForeignKey
ALTER TABLE "AvgFighterStats" ADD CONSTRAINT "AvgFighterStats_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
