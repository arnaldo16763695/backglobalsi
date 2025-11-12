import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class LoginUserDto{
  @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    // @IsString()
    // @IsNotEmpty()
    // password:string;   
}
