import { IS_ALPHANUMERIC, IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class AuthDto {
    @ApiProperty({ example: 'email@yahoo.com', description: 'email of user' })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ example: '1234567', description: 'password of user' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    password: string;

    @ApiProperty({ example: 'jane', description: 'name of user' })
    @IsNotEmpty()
    @IsString()
    name: string
}

export class AuthLoginDto {
    @ApiProperty({ example: 'email@yahoo.com', description: 'email of user' })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ example: '1234567', description: 'password of user' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    password: string;

}