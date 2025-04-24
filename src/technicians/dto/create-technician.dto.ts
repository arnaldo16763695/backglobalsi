import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnicianDto {
  @IsString()
  @IsNotEmpty()
  workId: string;

  @IsString()
  @IsNotEmpty()
  technicianId: string;
}
