import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuditsService {
  constructor(private prisma: PrismaService) {}
  async create(createAuditDto: CreateAuditDto) {
    return await this.prisma.auditLog.create({
      data: {
        id: createAuditDto.id,
        action: createAuditDto.action,
        userId: createAuditDto.userId,
        timestamp: new Date(),
        metadata: createAuditDto.metadata,
      },
    });
  }

  findAll() {
    return `This action returns all audits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }

  update(id: number, updateAuditDto: UpdateAuditDto) {
    return `This action updates a #${id} audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} audit`;
  }
}
