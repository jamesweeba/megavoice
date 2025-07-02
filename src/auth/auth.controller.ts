import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto,AuthLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/login')
    async login(@Body() dto:AuthLoginDto){
        let data=await this.authService.login(dto);
                return data

    }

    @Post('/signup')
    async  signup(@Body() dto:AuthDto){
        let data=await this.authService.signup(dto);
        return data

     }
}
