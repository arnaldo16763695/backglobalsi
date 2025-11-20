import { PartialType } from '@nestjs/swagger';
import { CreateImagestoworkDto } from './create-imagestowork.dto';

export class UpdateImagestoworkDto extends PartialType(CreateImagestoworkDto) {}
