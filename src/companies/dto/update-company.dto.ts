import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsEnum } from 'class-validator';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsEnum(Status)
  @Transform(({ value }) => value?.trimStart())
  status: Status;
}
