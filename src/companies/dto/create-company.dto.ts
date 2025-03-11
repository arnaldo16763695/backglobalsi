import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  observations: string;
}
