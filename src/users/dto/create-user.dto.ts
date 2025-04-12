import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Sanitize } from '@/decorators/sanitize.decorator';

export class CreateUserDto{
    @Sanitize()
    @IsString()
    @IsNotEmpty()    
    name: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    password:string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    phone: string;
}
