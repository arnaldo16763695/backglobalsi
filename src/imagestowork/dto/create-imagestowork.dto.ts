import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { Sanitize } from "../../decorators/sanitize.decorator";


export class CreateImagestoworkDto {
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  imageKey: string;

  @Sanitize()
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @Sanitize()
  @IsString()
  @IsNotEmpty()
  worksId: string;

}
