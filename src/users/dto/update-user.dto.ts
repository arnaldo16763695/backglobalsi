import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Role, Status } from '@prisma/client'; // Importa el enum Role desde Prisma
import { Transform } from 'class-transformer';

export class UpdateUserDto {
    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;   

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    role: Role;

    @Transform(({ value }) => value?.trimStart())
    @IsString()
    @IsNotEmpty()
    status: Status;
}