import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAuthDto {
  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  password: string;
}
