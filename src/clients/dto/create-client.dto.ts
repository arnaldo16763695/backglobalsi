import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClientDto{
    @IsString()
    @IsNotEmpty()    
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    rut:string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
