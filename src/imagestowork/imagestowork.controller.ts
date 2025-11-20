import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImagestoworkService } from './imagestowork.service';
import { CreateImagestoworkDto } from './dto/create-imagestowork.dto';
import { UpdateImagestoworkDto } from './dto/update-imagestowork.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@UseGuards(JwtGuard, RolesGuard) 
@Controller('imagestowork')
export class ImagestoworkController {
  constructor(private readonly imagestoworkService: ImagestoworkService) {}

  @ApiOperation({ summary: 'Create a new image' }) 
  @ApiResponse({ status: 201, description: 'The images has been successfully created.' })
  @Roles('ADMIN','TECHNICIAN')
  @Post()
  create(@Body() createImagestoworkDto: CreateImagestoworkDto) {
    return this.imagestoworkService.create(createImagestoworkDto);
  }

  @Roles('ADMIN','TECHNICIAN')
  @Get()
  findAll() {
    return this.imagestoworkService.findAll();
  }

  @ApiOperation({ summary: 'Get images by work' }) 
  @ApiResponse({ status: 201, description: 'The images has been successfully.' })
  @Roles('ADMIN','TECHNICIAN')
  @Get(':id')
  findImagesByIdWork(@Param('id') id: string) {
    return this.imagestoworkService.findImagesByIdWork(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagestoworkDto: UpdateImagestoworkDto) {
    return this.imagestoworkService.update(+id, updateImagestoworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagestoworkService.remove(id);
  }
}
