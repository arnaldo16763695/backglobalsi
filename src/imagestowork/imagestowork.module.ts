import { Module } from "@nestjs/common";
import { ImagestoworkService } from "./imagestowork.service";
import { ImagestoworkController } from "./imagestowork.controller";
import { PrismaService } from "../prisma/prisma.service";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ImagestoworkController],
  providers: [ImagestoworkService, PrismaService, JwtGuard, JwtService],
})
export class ImagestoworkModule {}
