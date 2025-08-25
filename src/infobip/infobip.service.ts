import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfobipService {

    constructor(private prismaservice: PrismaService) { }
    async handleVoiceCallStatus(body: any) {
        console.log('Received voice call status:', JSON.stringify(body));
        let { results } = body || [];
        /*
        {"results":[{"bulkId":"6c01739e-43b6-4bb7-8f32-67766916f0c6","messageId":"c62cbca4-e461-41aa-8c58-5e0f8a338592",
        "from":"442032864231","to":"233245655799",
        "sentAt":"2025-08-25T13:00:01.966+0000","mccMnc":null,
        "callbackData":"cmer4jz2q0018mv2bs3tvh1l4",
        "voiceCall":{"feature":"Text-to-Speech","startTime":"2025-08-25T13:00:02.533+0000",
        "answerTime":"2025-08-25T13:00:17.907+0000","endTime":"2025-08-25T13:00:42.947+0000",
        "duration":26,"chargedDuration":0,"fileDuration":null,"dtmfCodes":null,"ivr":null},
        "price":{"pricePerSecond":0.0,"currency":"UNKNOWN"},
        "status":{"groupId":3,"groupName":"DELIVERED","id":5,"name":"DELIVERED_TO_HANDSET",
        "description":"Message delivered to handset"},
        "error":{"groupId":0,"groupName":"OK","id":10000,"name":"NORMAL_HANGUP",
        "description":"The call has ended with hangup initiated by caller, callee or API","permanent":true}}]}

        */

        for (const result of results) {
            const id = result.callbackData;
            const status = result?.status?.groupName || 'UNKNOWN';
            console.log(`Updating record ${id} with status ${status}`);
            let updatedCall = await this.prismaservice.voiceMessage.update({
                where: { id },
                data: { status, infobipData: results},
            });
            console.log(`Updated record: ${updatedCall.id} with status: ${updatedCall.status}`);
            return updatedCall;
        }
    }


    // Logic for handling voice calls
    // This could involve processing the results and updating the database or sending notifications
}

