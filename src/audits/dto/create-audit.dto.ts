import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  id: string;
  @IsString()
  action: string;
  @IsString()
  userId: string;
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
