import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { Transform } from "class-transformer";

export class CreateWorkDto {
    
    @IsString()
    @IsNotEmpty()
    description?:       string
    @IsString()
    finalObservations?: string
    @IsString()
    userId?:           string
    @IsString()
    companyId?:        string   
  
} 
