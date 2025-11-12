import { IsString, IsNotEmpty } from 'class-validator';
import { Sanitize } from '../../decorators/sanitize.decorator';

export class UpdatePassUserDto {
    @Sanitize()
    @IsString()
    @IsNotEmpty()
    password: string;  
}