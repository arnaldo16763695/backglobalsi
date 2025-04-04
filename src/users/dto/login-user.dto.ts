import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto{
  @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    // @IsString()
    // @IsNotEmpty()
    // password:string;   
}
