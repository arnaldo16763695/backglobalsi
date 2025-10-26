import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @Transform(({ value }) => value?.trimStart())
    status: Status;
}



