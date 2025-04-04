import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'Create a new company' })
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'The companies have been successfully retrieved.' })
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @ApiOperation({ summary: 'Get a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully retrieved.' })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully updated.' })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @ApiOperation({ summary: 'Delete a company by id' })
  @ApiResponse({ status: 200, description: 'The company has been successfully deleted.' })
  @UseGuards(JwtGuard)
  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
