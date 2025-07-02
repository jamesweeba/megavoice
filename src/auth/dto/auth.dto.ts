import { IS_ALPHANUMERIC, IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthDto{

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string
}

export class AuthLoginDto{

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    password: string;

}