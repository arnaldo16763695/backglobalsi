import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateOrderCode } from '@/utils/generate-work-code';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkDto: CreateWorkDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const countToday = await this.prisma.works.count({
      where: {
        createdAt: { gte: today },
      },
    });

    const code = generateOrderCode(countToday + 1); 

    return await this.prisma.works.create({
      data: {
        userId: createWorkDto.userId,
        companyId: createWorkDto.companyId,
        workCode: code
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
