import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 201, description: 'The client has been successfully created.' })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'The clients have been successfully retrieved.' })
  @UseGuards(JwtGuard)
  @Get()  
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({ status: 200, description: 'The client has been successfully retrieved.' })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a client by id' })
  @ApiResponse({ status: 200, description: 'The client has been successfully updated.' })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto); 
  }

  @ApiOperation({ summary: 'Delete a client by id' })
  @ApiResponse({ status: 200, description: 'The client has been successfully deleted.' })
  @UseGuards(JwtGuard)
  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
