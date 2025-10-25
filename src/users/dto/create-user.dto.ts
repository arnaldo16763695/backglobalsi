import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Sanitize } from '@/decorators/sanitize.decorator';
import { Role, Status } from '@prisma/client'; // Importa el enum Role desde Prisma

export class CreateUserDto{
    @Sanitize()
    @IsString()
    @IsNotEmpty()    
    name: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    password:string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @Sanitize()
    @IsString()
    @IsOptional()
    avatar: string

    @Sanitize()
    @IsString()
    @IsOptional()
    avatarKey: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    role: Role;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    status: Status;
}
