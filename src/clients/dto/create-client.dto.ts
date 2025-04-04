import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto{
    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()    
    name: string;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    rut:string;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    phone: string;
}
