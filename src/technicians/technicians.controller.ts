import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { Roles } from '../decorators/roles.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
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
  getAllTech() {
    return this.techniciansService.getTechnicians();
  }

  @ApiOperation({ summary: 'Get all technicians' })
  @ApiResponse({
    status: 200,
    description: 'The technicians have been successfully retrieved.',
  })
  @Roles('ADMIN', 'TECHNICIAN')
  @Get(':workId')
  findOneTechnicianInWork(@Param('workId') workId: string) {
    return this.techniciansService.getTechniciansInWork(workId);
  }

  @Roles('ADMIN')
  @Delete('removefromwork/:idwork/:idtechnician')
  remove(
    @Param('idwork') idwork: string,
    @Param('idtechnician') idtechnician: string,
  ) {
    return this.techniciansService.remove(idwork, idtechnician);
  }
}
