import { PartialType } from '@nestjs/swagger';
import { CreateWorkDto } from './create-work.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { StatusProgress } from '@prisma/client';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  progress?: StatusProgress;
 
}
