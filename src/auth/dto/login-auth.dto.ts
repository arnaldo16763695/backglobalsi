import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class LoginAuthDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
