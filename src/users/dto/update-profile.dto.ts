import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class UpdateProfileDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Sanitize()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @Sanitize()
  @IsString()
  @IsOptional()
  avatar?: string;

  @Sanitize()
  @IsString()
  @IsOptional()
  avatarKey?: string;
}
