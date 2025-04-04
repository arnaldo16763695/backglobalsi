import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePassUserDto {
    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    password: string;  
}