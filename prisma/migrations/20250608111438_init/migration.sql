-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'RETRYING');

-- CreateTable
CREATE TABLE "VoiceMessage" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'PENDING',
    "audioFileUrl" TEXT NOT NULL,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VoiceMessage_phoneNumber_idx" ON "VoiceMessage"("phoneNumber");

-- CreateIndex
CREATE INDEX "VoiceMessage_campaignId_idx" ON "VoiceMessage"("campaignId");

-- CreateIndex
CREATE INDEX "VoiceMessage_status_idx" ON "VoiceMessage"("status");

-- AddForeignKey
ALTER TABLE "VoiceMessage" ADD CONSTRAINT "VoiceMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "VoiceCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
