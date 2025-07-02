-- AlterTable
ALTER TABLE "VoiceCampaign" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "VoiceCampaign_userId_idx" ON "VoiceCampaign"("userId");

-- AddForeignKey
ALTER TABLE "VoiceCampaign" ADD CONSTRAINT "VoiceCampaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
