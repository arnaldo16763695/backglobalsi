import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { USER_SAFE_SELECT } from '../users/user-safe-select';

@Injectable()
export class TechniciansService {
  constructor(private prisma: PrismaService) {}

  async assigmentTechToWork(createTechnicianDto: CreateTechnicianDto) {
    try {
      const res = await this.prisma.workTechnician.create({
        data: {
          workId: createTechnicianDto.workId,
          technicianId: createTechnicianDto.technicianId,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: res,
        message: 'The technician has been successfully assigned to the work.',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`El técnico ya existe en esta orden`);
        }
      }
      console.log(error);
    }
  }

  async getTechniciansInWork(workId: string) {
    try {
      return this.prisma.workTechnician.findMany({
        where: {
          workId,
        },
        include: {
          technician: { select: USER_SAFE_SELECT },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTechnicians() {
    try {
      return this.prisma.user.findMany({
        where: {
          role: 'TECHNICIAN',
          status: {
            in: ['ACTIVE'],
          },
        },
        select: USER_SAFE_SELECT,
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(idwork: string, idtechnician: string) {
    const check = await this.prisma.workTechnician.count({
      where: {
        workId: idwork,
      },
    });
    const statusWork = await this.prisma.works.findFirst({
      where: {
        id: idwork,
        progress: 'IN_PROGRESS',
      },
    });

    const statusFinished = await this.prisma.works.findFirst({
      where: {
        id: idwork,
        progress: 'FINISHED',
      },
    });

    if (check === 1 && statusWork) {
      return {
        error: 'hay un error',
        message:
          "no puede dejar la orden sin técnico, la debe colocar como 'No Inciada'",
      };
    }
    if (statusFinished) {
      return {
        error: 'hay un error',
        message: 'No puede eliminar un técnico de una orden finalizada',
      };
    }

    return await this.prisma.workTechnician.delete({
      where: {
        workId_technicianId: {
          workId: idwork,
          technicianId: idtechnician,
        },
      },
    });
  }
}
