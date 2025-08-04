import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletService {

    constructor(private prismaservice:PrismaService) {}

    async userCredit(amount: number) {
        // return this.prismaservice.user.update({
        //     where: { userId },
        //     data: { balance: { increment: amount } },
        // });

    }




    
}
