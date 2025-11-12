import { Sanitize } from '../../decorators/sanitize.decorator';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class CreateClientDto{
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
    rut:string;

    @Sanitize() 
    @IsString()
    @IsNotEmpty()
    phone: string;
}
