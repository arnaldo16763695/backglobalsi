import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'Create a new company' }) 
  @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
  @Roles('ADMIN')
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'The companies have been successfully retrieved.' })
  @Roles('ADMIN') 
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @ApiOperation({ summary: 'Get a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully retrieved.' })
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully updated.' })
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @ApiOperation({ summary: 'Delete a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully deleted.' })
  @Roles('ADMIN')
  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
