import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role, Status } from '@prisma/client';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class CreateUserDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Sanitize()
  @IsString()
  @IsOptional()
  avatar?: string;

  @Sanitize()
  @IsString()
  @IsOptional()
  avatarKey?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
