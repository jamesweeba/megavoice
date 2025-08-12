import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfobipService {

    constructor(private prismaservice: PrismaService) { }
    async handleVoiceCallStatus(body: any) {
        let { results } = body || [];
        for (const result of results) {
            const id = result.callbackData;
            const status = result.status?.name || 'UNKNOWN';
            console.log(`Updating record ${id} with status ${status}`);
            let updatedCall = await this.prismaservice.voiceMessage.update({
                where: { id },
                data: { status, infobipData: result },
            });
            console.log(`Updated record: ${updatedCall.id} with status: ${updatedCall.status}`);
            return updatedCall;
        }
    }


    // Logic for handling voice calls
    // This could involve processing the results and updating the database or sending notifications
}

