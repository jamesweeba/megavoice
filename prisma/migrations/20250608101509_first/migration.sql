-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "VoiceCampaign" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "CampaignStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "audioFileUrl" TEXT NOT NULL,
    "recipeint" JSONB NOT NULL,

    CONSTRAINT "VoiceCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VoiceCampaign_status_idx" ON "VoiceCampaign"("status");

-- CreateIndex
CREATE INDEX "VoiceCampaign_title_idx" ON "VoiceCampaign"("title");
