import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { Roles } from '@/decorators/roles.decorator';
import { UsersService } from '@/users/users.service';
import { JwtGuard } from '@/auth/guard/jwt.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtGuard, RolesGuard)
@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.techniciansService.assigmentTechToWork(createTechnicianDto);
  }

  @ApiOperation({ summary: 'Get all technicians' })
  @ApiResponse({
    status: 200,
    description: 'The technicians have been successfully retrieved.',
  })
  @Roles('ADMIN')
  @Get()
  getAllTech(){
    return this.techniciansService.getTechnicians();
  }

  @ApiOperation({ summary: 'Get all technicians' })
  @ApiResponse({
    status: 200,
    description: 'The technicians have been successfully retrieved.',
  })
  @Roles('ADMIN')
  @Get(':workId')
  findOneTechnicianInWork(
    @Param('workId') workId: string,
  ) {
    return this.techniciansService.getTechniciansInWork(workId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechnicianDto: UpdateTechnicianDto,
  ) {
    return this.techniciansService.update(+id, updateTechnicianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techniciansService.remove(+id);
  }
}
