// step-order.dto.ts
import { IsString, IsInt, Min } from "class-validator";
export class StepOrderDto {
  @IsString()
  id: string;

  @IsInt()
  @Min(0)
  order: number;
}