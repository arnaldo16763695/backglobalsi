import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdatePassUserDto } from './dto/update-password-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return {
      statusCode: HttpStatus.CREATED,
      data: result,
      message: 'The client has been successfully created.',
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El usuario con el email: ${updateUserDto.email}, ya existe`,
          );
        }
      }
      // Si el error no es de Prisma, lo relanzamos para que se maneje en otro lugar
      console.error('Error no manejado:', error);
      throw error;
    }
  }

  async updateProfile(
    fromId: string,
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      if (fromId !== id) {
        throw new UnauthorizedException(
          'No tienes permiso para actualizar el perfil',
        );
      }
      return await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id,
        },
      });
    } catch (error) {
      // Si el error no es de Prisma, lo relanzamos para que se maneje en otro lugar
      console.error('Error no manejado:', error);
      throw error;
    }
  }

  async changepassProfile(
    id: string,
    fromId: string,
    updatePassUserDto: UpdatePassUserDto,
  ) {
    if (id !== fromId) {
      throw new UnauthorizedException(
        'No tienes permiso para cambiar la contraseña',
      );
    }
    const user = await this.prisma.user.findUnique({
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
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: updatePassUserDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.prisma.user.findMany({
        where: {
          status: {
            in: ['ACTIVE', 'INACTIVE'],
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
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
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }
    return user;
  }

  async findOneProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }
    return user;
  }

  async changepass(id: string, updatePassUserDto: UpdatePassUserDto) {
    const user = await this.prisma.user.findUnique({
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
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: updatePassUserDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
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
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    try {
      return this.prisma.user.update({
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
