import { IsString, IsNotEmpty } from "class-validator";

export class CreateWorkDto {
    
    // @IsString()
    // @IsNotEmpty()
    // description?:       string
    // @IsString()
    // finalObservations?: string
    @IsString()
    userId?:           string
    @IsString()
    companyId?:        string   
  
} 
