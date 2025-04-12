import { 
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.prisma.company.create({
        data: createCompanyDto,
      });

      return company;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El Rut: ${createCompanyDto.rut}, ya existe`,
          );
        }
      }
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.prisma.company.findMany({
        where: {
          status: {
            in: ['ACTIVE', 'INACTIVE'],
          },
        },
        include: {
          Clients: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          id,
          status: {
            in: ['ACTIVE', 'INACTIVE'],
          },
        },
        include: {
          Clients: true,
        },
      });

      if (!company) {
        // throw new NotFoundException(`User with id: ${id} not found`);
        throw new NotFoundException(
          `La empresa con el id: ${id} no fue encontrada`,
        );
      }

      return company;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          id,
        },
        include: {
          Clients: true,
        },
      });

      if (!company) {
        // throw new NotFoundException(`User with id: ${id} not found`);
        throw new NotFoundException(
          `La empresa con el id: ${id} no fue encontrada`,
        );
      }

      return await this.prisma.company.update({
        where: {
          id,
        },
        data: updateCompanyDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `La empresa con el rut: ${updateCompanyDto.rut}, ya existe`,
          );
        }
      }
      // Si el error no es de Prisma, lo relanzamos para que se maneje en otro lugar
      console.error('Error no manejado:', error);
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.prisma.company.findUnique({
      where: {
        id,
        status: {
          in: ['ACTIVE', 'INACTIVE'],
        },
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `La empresa con el id: ${id} no fue encontrada`,
      );
    }

    try {
      return this.prisma.company.update({
        where: {
          id,
        },
        data: {
          status: 'DELETED',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
