import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UseGuards } from '@nestjs/common';


@UseGuards(JwtGuard, RolesGuard)
@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiOperation({ summary: 'Create a new work' })
  @ApiResponse({ status: 201, description: 'The work has been successfully created.' })
  @Roles('ADMIN')
  @Post()
  create(@Body() createWorkDto: CreateWorkDto) {
    return this.worksService.create(createWorkDto);
  }

  @ApiOperation({ summary: 'Get all works' })
  @ApiResponse({ status: 200, description: 'The works have been successfully retrieved.' })
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.worksService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific work' })
  @ApiResponse({ status: 200, description: 'The work has been successfully retrieved.' })
  @Roles('ADMIN', 'TECHNICIAN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worksService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a specific work' })
  @ApiResponse({ status: 200, description: 'The work has been successfully retrieved.' })
  @Roles('ADMIN', 'TECHNICIAN')
  @Get('technicians/:id')
  findAllWorkByTechnician(@Param('id') id: string) {
    return this.worksService.findAllWorkByTechnician(id);
  }

  @ApiOperation({ summary: 'Update a specific work' })
  @ApiResponse({ status: 200, description: 'The work has been successfully updated.' })
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.worksService.updateStatusWork(id, updateWorkDto);
  } 

  @ApiOperation({ summary: 'Update a specific work' })
  @ApiResponse({ status: 200, description: 'The work has been successfully updated.' })
  @Roles('ADMIN')
  @Patch('companyinwork/:id')
  updateCompanyInWork(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.worksService.updateCompanyInWork(id, updateWorkDto);
  } 

  @ApiOperation({ summary: 'Delete a specific work' })
  @ApiResponse({ status: 200, description: 'The work has been successfully deleted.' })
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worksService.remove(id);
  }
}
