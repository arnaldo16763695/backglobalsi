import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { Sanitize } from "../../decorators/sanitize.decorator";

export class CreateCompanyDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  rut: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  clientsId: string;

  @Sanitize()
  @IsString()
  observations: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
