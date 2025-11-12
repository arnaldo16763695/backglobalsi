import { IsString, IsOptional, IsObject } from 'class-validator';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class CreateAuditDto {
  @Sanitize()
  @IsString()
  id: string;
  @Sanitize()
  @IsString()
  action: string;
  @Sanitize()
  @IsString()
  userId: string;
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
