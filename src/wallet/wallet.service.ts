import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
    constructor(private prismaservice: PrismaService) { }
    async userCredit(dto: CreateWalletDto) {
        let { userId, amount } = dto;
        let creditTopUp = await this.prismaservice.user.update({
            where: { id: userId },
            data: { balance: { increment: amount } },
        });

        let{ balance,id,email } = creditTopUp;
        return { id, email,balance };    

    }





}
