import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.prisma.clients.create({
        data: createClientDto,
      });

      return client;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            `Email: ${createClientDto.email} o el rut: ${createClientDto.rut} , ya existe`
          );
          // throw new ConflictException(`User with name: ${createUserDto.name}, already exist`)
        }
      }
      console.log(error)
    }
  }

  findAll() {
    try {
      return this.prisma.clients.findMany({
        where: {
          status: {
            in: ["ACTIVE", "INACTIVE"],
          },
        },
        include: { company: true, works: true },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.prisma.clients.findUnique({
        where: {
          id,
          status: {
            in: ["ACTIVE", "INACTIVE"],
          },
        },
      });
      if (!client) {
        // throw new NotFoundException(`User with id: ${id} not found`);
        throw new NotFoundException(
          `El cliente con el id: ${id} no fue encontrado`
        );
      }
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.clients.findUnique({
      where: {
        id,
        status: {
          in: ["ACTIVE", "INACTIVE"],
        },
      },
    });
    if (!client) {
      // throw new NotFoundException(`User with id: ${id} not found`);
      throw new NotFoundException(
        `El cliente con el id: ${id} no fue encontrado`
      );
    }

    try {
      return await this.prisma.clients.update({
        where: {
          id,
        },
        data: updateClientDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(`El cliente con el email: ${updateClientDto.email}, ya existe`);
          // throw new ConflictException(`User with id: ${id}, already exist`)
        }
      }
    }
  }

  async remove(id: string) {
    const user = await this.prisma.clients.findUnique({
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
        `El cliente con el id: ${id} no fue encontrado`
      );
    }

    try {
      return this.prisma.clients.update({
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
