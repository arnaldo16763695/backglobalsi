import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdatePassUserDto {
    @IsString()
    @IsNotEmpty()
    password: string;  
}