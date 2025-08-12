import { IsNegative, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateWalletDto {

   @IsNotEmpty()
   @IsString()
   userId: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    amount: number;
}   