import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdatePassUserDto } from "./dto/update-password-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            `El usuario con el email: ${createUserDto.email}, ya existe`
          );
          // throw new ConflictException(`User with name: ${createUserDto.name}, already exist`)
        }
      }
    }
  }
  async login(loginUser: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUser.email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Credenciales invalidas`);
    }

    return user;
  }

  findAll() {
    try {
      return this.prisma.user.findMany({
        where: {
          status: {
            in: ["ACTIVE", "INACTIVE"],
          },
        },
        orderBy:{
          updatedAt: 'desc'
        }
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
          in: ["ACTIVE", "INACTIVE"],
        },
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`
      );
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        status: {
          in: ["ACTIVE", "INACTIVE"],
        },
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`
      );
    }

    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(`El usuario con el id: ${id}, ya existe`);
          // throw new ConflictException(`User with id: ${id}, already exist`)
        }
      }
    }
  }

  async changepass(id: string, updatePassUserDto: UpdatePassUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        status: {
          in: ["ACTIVE", "INACTIVE"],
        },
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`
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
          in: ["ACTIVE", "INACTIVE"],
        },
      },
    });
    if (!user) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El usuario con el id: ${id} no fue encontrado`
      );
    }

    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          status: "DELETED",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
