import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepstoworksService } from './stepstoworks.service';
import { CreateStepstoworkDto } from './dto/create-stepstowork.dto';
import { UpdateStepstoworkDto } from './dto/update-stepstowork.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UseGuards } from '@nestjs/common';
import { ReorderStepstoworkDto } from './dto/reorder-stepstowork.dto';


@UseGuards(JwtGuard, RolesGuard)
@Controller('stepstoworks')
export class StepstoworksController {
  constructor(private readonly stepstoworksService: StepstoworksService) {}
  
  @ApiOperation({ summary: 'Create a new stepstowork' })
  @ApiResponse({ status: 201, description: 'The stepstowork has been successfully created.' })
  @Roles('ADMIN')
  @Post()
  create(@Body() createStepstoworkDto: CreateStepstoworkDto) {
    return this.stepstoworksService.create(createStepstoworkDto);
  }

  @ApiOperation({ summary: 'Reorder steps' })
  @ApiResponse({ status: 200, description: 'The steps have been successfully reordered.' })
  @Roles('ADMIN')
  @Patch('reorder/:id')
  async reorderSteps(@Param('id') id: string,
  @Body() reorderStepstoworkDto: ReorderStepstoworkDto,) {
    console.log(reorderStepstoworkDto)
    return this.stepstoworksService.reorderSteps(id, reorderStepstoworkDto);
  }

  @ApiOperation({ summary: 'Get all steps by work id' })
  @ApiResponse({ status: 200, description: 'The steps have been successfully retrieved.' })
  @Roles('ADMIN','TECHNICIAN')
  @Get(':id')
  findByIdWork(@Param('id') id: string) {
    return this.stepstoworksService.findStepsByWorkId(id);
  }

  @ApiOperation({ summary: 'Get all pending steps by work id' })
  @ApiResponse({ status: 200, description: 'The steps have been successfully retrieved.' })
  @Roles('ADMIN','TECHNICIAN')
  @Get('pending/:id')
  findPendingSteps(@Param('id') id: string) {
    return this.stepstoworksService.findPendingSteps(id);
  }

  @ApiOperation({ summary: 'Get all finished steps by work id' })
  @ApiResponse({ status: 200, description: 'The steps have been successfully retrieved.' })
  @Roles('ADMIN','TECHNICIAN')
  @Get('finished/:id')
  findFinishedSteps(@Param('id') id: string) {
    return this.stepstoworksService.findFinishedSteps(id);
  }

  @Roles('ADMIN','TECHNICIAN')
  @Patch(':id')
  editStepToWork(@Param('id') id: string, @Body() updateStepstoworkDto: UpdateStepstoworkDto) {
    return this.stepstoworksService.editStepToWork(id, updateStepstoworkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepstoworksService.findOne(+id);
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepstoworksService.remove(id);
  }
}
