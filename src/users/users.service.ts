import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePassUserDto } from './dto/update-password-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SAFE_SELECT } from './user-safe-select';

const ACTIVE_STATUSES: Prisma.EnumStatusFilter = {
  in: ['ACTIVE', 'INACTIVE'],
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }

    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await hash(createUserDto.password, 10),
        },
        select: USER_SAFE_SELECT,
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: newUser,
        message: 'The client has been successfully created.',
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = { ...updateUserDto };
      if (data.password) {
        data.password = await hash(data.password, 10);
      }

      return await this.prisma.user.update({
        data,
        where: { id },
        select: USER_SAFE_SELECT,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El usuario con el email: ${updateUserDto.email}, ya existe`,
          );
        }
      }
      throw error;
    }
  }

  async updateProfile(id: string, updateUserDto: UpdateProfileDto) {
    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: { id },
        select: USER_SAFE_SELECT,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El usuario con el email: ${updateUserDto.email}, ya existe`,
          );
        }
      }
      throw error;
    }
  }

  async changepassProfile(id: string, updatePassUserDto: UpdatePassUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: ACTIVE_STATUSES },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: { password: await hash(updatePassUserDto.password, 10) },
      select: USER_SAFE_SELECT,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { status: ACTIVE_STATUSES },
      select: USER_SAFE_SELECT,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: ACTIVE_STATUSES },
      select: USER_SAFE_SELECT,
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }
    return user;
  }

  async findOneProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SAFE_SELECT,
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }
    return user;
  }

  async changepass(id: string, updatePassUserDto: UpdatePassUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: ACTIVE_STATUSES },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: { password: await hash(updatePassUserDto.password, 10) },
      select: USER_SAFE_SELECT,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: ACTIVE_STATUSES },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: { status: 'DELETED' },
      select: USER_SAFE_SELECT,
    });
  }
}
