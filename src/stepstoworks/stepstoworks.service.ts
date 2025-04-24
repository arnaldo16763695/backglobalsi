import { HttpStatus, Injectable, ConflictException } from '@nestjs/common';
import { CreateStepstoworkDto } from './dto/create-stepstowork.dto';
import { UpdateStepstoworkDto } from './dto/update-stepstowork.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ReorderStepstoworkDto } from './dto/reorder-stepstowork.dto';

@Injectable()
export class StepstoworksService {
  constructor(private prisma: PrismaService) {}

  async create(createStepstoworkDto: CreateStepstoworkDto) {
    try {
      const item = await this.prisma.stepsToWork.create({
        data: createStepstoworkDto,
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: item,
        message: 'The item has been successfully created.',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Ya existe un item con esta descripción:  ${createStepstoworkDto.description},  en esta orden`,
          );
        }
      }
      console.log(error);
    }
  }

  findStepsByWorkId(worksId: string) {
    return this.prisma.stepsToWork.findMany({
      where: {
        worksId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        user: true,
      },
    });
  } 

 async reorderSteps(
  id: string,
  reorderStepstoworkDto: ReorderStepstoworkDto
  ) {
    // Transacción: actualiza todos los pasos
   const res = await this.prisma.$transaction(
      reorderStepstoworkDto.ordered.map(({ id, order }) =>
        this.prisma.stepsToWork.update({ where: { id }, data: { order } })
      )
    );
    console.log(res)
    return res;
  }

 async  editStepToWork(id: string, updateStepstoworkDto: UpdateStepstoworkDto){
  try {
    const item = await this.prisma.stepsToWork.update({
      where: { id },
      data: updateStepstoworkDto,
    });

    return {
      statusCode: HttpStatus.CREATED,
      data: item,
      message: 'The item has been successfully edited.',
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Ya existe un item con esta descripción:  ${updateStepstoworkDto.description},  en esta orden`,
        );
      }
    }
    console.log(error);
  }
 }

  findOne(id: number) {
    return `This action returns a #${id} stepstowork`;
  }

  update(id: string, updateStepstoworkDto: UpdateStepstoworkDto) {
    return `This action updates a #${id} stepstowork`;
  }

  async remove(id: string) {
    try {
      const item = await this.prisma.stepsToWork.delete({ where: { id } });
      return {
        statusCode: HttpStatus.CREATED,
        data: item,
        message: 'The item has been successfully deleted.',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
