import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCompanyDto {
  
  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  rut: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  location: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  clientsId: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  observations: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trimStart())
  @IsString()
  @IsNotEmpty()
  phone: string;
}
