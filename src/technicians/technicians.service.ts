import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`El técnico ya existe en esta orden`);
        }
      }
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all technicians`;
  }

  async getTechniciansInWork(workId: string) {
    try {
      return this.prisma.workTechnician.findMany({
        where: {
          workId,
        },
        include: {
          technician: true,
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
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} technician`;
  }

  update(id: number, updateTechnicianDto: UpdateTechnicianDto) {
    return `This action updates a #${id} technician`;
  }

  remove(id: number) {
    return `This action removes a #${id} technician`;
  }
}
