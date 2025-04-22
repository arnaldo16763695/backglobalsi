import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Sanitize } from '@/decorators/sanitize.decorator';

export class CreateStepstoworkDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Sanitize()
  @IsInt()
  @IsNotEmpty()
  order: number;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  worksId: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
