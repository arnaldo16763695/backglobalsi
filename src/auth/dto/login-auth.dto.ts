import { IsString, IsNotEmpty } from 'class-validator';
import { Sanitize } from '@/decorators/sanitize.decorator';

export class LoginAuthDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  password: string;
}
