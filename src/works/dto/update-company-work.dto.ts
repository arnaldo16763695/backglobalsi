import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCompanyWorkDto {

    @IsString()
    @IsNotEmpty()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
