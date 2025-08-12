import { Body, Controller, Post, Req, UseGuards ,BadRequestException} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { CreateWalletDto } from './dto/wallet.dto';
import { validate } from 'class-validator';
import { UtilService } from '../util/util.service';




@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
    constructor(private walletservice: WalletService, private utilService: UtilService) { }
    @Post('/credit')
    async credit(@Body() body: any, @Req() req) {
        const dto = plainToInstance(CreateWalletDto, {
            ...body,
            userId: req.user.userId,
        });

        const errors = await validate(dto, {
            forbidNonWhitelisted: true,
            whitelist: true,
        });
        if (errors.length > 0) {
            const messages = await this.utilService.extractMessages(errors);
            throw new BadRequestException(messages);
        }
        return this.walletservice.userCredit(dto);
    }



    @Post('/debit')
    debit() {
        // Logic for debiting the wallet
    }
}
