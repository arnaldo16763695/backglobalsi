// reorder-steps.dto.ts
import {
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsString,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";
import { StepOrderDto } from "./step-order.dto";
import { Sanitize } from "../../decorators/sanitize.decorator";

export class ReorderStepstoworkDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  worksId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StepOrderDto)
  ordered: StepOrderDto[];
}