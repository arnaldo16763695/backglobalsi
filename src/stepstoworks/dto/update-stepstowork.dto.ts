import { PartialType } from '@nestjs/swagger';
import { CreateStepstoworkDto } from './create-stepstowork.dto';

export class UpdateStepstoworkDto extends PartialType(CreateStepstoworkDto) {}
