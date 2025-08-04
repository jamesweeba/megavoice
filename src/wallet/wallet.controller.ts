import { Controller, Post,UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
    constructor(private walletservie:WalletService) {}

    @Post('/credit')
    credit() {
        // Logic for crediting the wallet
    }

    @Post('/debit')
    debit() {
        // Logic for debiting the wallet
    }
}
