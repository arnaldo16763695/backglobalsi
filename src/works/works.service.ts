import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkDto: CreateWorkDto) {
    return this.prisma.works.create({
      data: {
        description: createWorkDto.description,
        finalObservations: createWorkDto.finalObservations,
        userId: createWorkDto.userId,
        companyId: createWorkDto.companyId,       
      },
    });
  }

  async findAll() {
    return this.prisma.works.findMany({
      include: {
        User: true,
        company: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.works.findUnique({
      where: { id },
      include: {
        User: true,
        company: true,
      },
    });
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {
    return this.prisma.works.update({
      where: { id },
      data: updateWorkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.works.delete({
      where: { id },
    });
  }
}
