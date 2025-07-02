import { ForbiddenException, Injectable ,UnauthorizedException} from '@nestjs/common';
import { AuthDto, AuthLoginDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService  {
    constructor(private prisma:PrismaService,private jwt: JwtService,){ }
    async login(dto:AuthLoginDto){
        let{email}=dto
        const user=await this.prisma.user.findUnique({
            where:{
                 email
            }
        });
        if (!user) throw new UnauthorizedException('Invalid credentials');
            const passwordMatches = await argon2.verify(user.password, dto.password);
        if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload,{expiresIn:'1h',secret:'a4'} );
    return {
        id:user.id,
        email:user.email,
        name:user.name,
        token
        // payload
    };
    }

    async signup(dto:AuthDto){
        const hashedPassword = await argon2.hash(dto.password);
        dto.password=hashedPassword
        try{
             const user = await this.prisma.user.create({
             data: dto,
             select: {
            id: true,
            email: true,
            name: true,
         },
       });
     const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload,{expiresIn:'1h',secret:'a4'} );
    return {
        id:user.id,
        email:user.email,
        name:user.name,
        token
    };}
        catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
                
            }
        }
    }
}
