import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Role, Status } from '@prisma/client'; // Importa el enum Role desde Prisma
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;   

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    role: Role;

    @IsString()
    @IsNotEmpty()
    status: Status;
}