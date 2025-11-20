import { Injectable } from "@nestjs/common";
import { CreateImagestoworkDto } from "./dto/create-imagestowork.dto";
import { UpdateImagestoworkDto } from "./dto/update-imagestowork.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ImagestoworkService {
  constructor(private prisma: PrismaService) {}

  async create(createImagestoworkDto: CreateImagestoworkDto) {
    try {
      const images = await this.prisma.imagesWorks.create({
        data: createImagestoworkDto,
      });
      return images;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.prisma.imagesWorks.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findImagesByIdWork(id: string) {
    try {
      const images = await this.prisma.imagesWorks.findMany({
        where: {
          worksId: id,
        },
      });
      return images;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} imagestowork`;
  }

  update(id: number, updateImagestoworkDto: UpdateImagestoworkDto) {
    return `This action updates a #${id} imagestowork`;
  }

  async remove(id: string) {
    try {
      const images = await this.prisma.imagesWorks.delete({
        where: {
          id,
        },
      });
      return images;
    } catch (error) {
      console.log(error);
    }
  }
}
