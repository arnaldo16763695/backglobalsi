import { Injectable } from "@nestjs/common";
import { CreateWorkDto } from "./dto/create-work.dto";
import { PrismaService } from "../prisma/prisma.service";
import { generateOrderCode } from "../utils/generate-work-code";
import { UpdateWorkDto } from "./dto/update-work.dto";
import { getChileStartOfTodayUTC } from "../utils/helpers";

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkDto: CreateWorkDto) {
    const startOfTodayChileUtc = getChileStartOfTodayUTC();

    const countToday = await this.prisma.works.count({
      where: {
        createdAt: { gte: startOfTodayChileUtc },
      },
    });

    const code = generateOrderCode(countToday + 1);

    return await this.prisma.works.create({
      data: {
        userId: createWorkDto.userId,
        companyId: createWorkDto.companyId,
        workCode: code,
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

  async updateStatusWork(id: string, updateWorkDto: UpdateWorkDto) {
    return this.prisma.works.update({
      where: { id },
      data: updateWorkDto,
    });
  }

  async updateCompanyInWork(id: string, updateWorkDto: UpdateWorkDto) {
    return this.prisma.works.update({
      where: { id },
      data: updateWorkDto,
    });
  }

  async findAllWorkInProgressByTechnician(technicianId: string) {
    return await this.prisma.works.findMany({
      where: {
        technicians: {
          some: {
            technicianId, // <- aquí filtramos en la tabla intermedia
          },
        },
        progress: "IN_PROGRESS",
      },
      include: {
        User: true,
        company: true,
      },
    });
  }

  async findAllWorkFinishedByTechnician(technicianId: string) {
    return await this.prisma.works.findMany({
      where: {
        technicians: {
          some: {
            technicianId, // <- aquí filtramos en la tabla intermedia
          },
        },
        progress: "FINISHED",
      },
      include: {
        User: true,
        company: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.works.delete({
      where: { id },
    });
  }

  async startsOrderbyTechnnician(idWork: string) {
    return await this.prisma.works.update({
      where: { id: idWork },
      data: {
        isStartedByTech: true,
        startedByTechAt: new Date(),
      },
    });
  }
  async finishOrderbyTechnnician(idWork: string) {
    return await this.prisma.works.update({
      where: { id: idWork },
      data: {
        progress: "FINISHED",
        finishedByTechAt: new Date(),
        isFinishedByTech: true,
      },
    });
  }
}
