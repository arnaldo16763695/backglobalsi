import { IsString, IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { Sanitize } from '../../decorators/sanitize.decorator';
import { StatusSteps } from "@prisma/client";

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

  @Sanitize()
  @IsString()
  @IsOptional()
  status: StatusSteps;
}
