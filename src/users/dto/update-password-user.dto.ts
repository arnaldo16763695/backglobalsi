import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePassUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
