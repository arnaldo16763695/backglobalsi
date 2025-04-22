import { StatusProgress } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, isString } from 'class-validator';

export class UpdateStatusWorkDto {
    @IsEnum(StatusProgress)
    @IsNotEmpty()
    progress: StatusProgress;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
