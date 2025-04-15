import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassUserDto } from './dto/update-password-user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Roles('ADMIN') 
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  } 
  
  @Roles('ADMIN')
  @Patch('changepass/:id')
  changepass(@Param('id') id: string, @Body() updatePassUserDto: UpdatePassUserDto) {
    return this.usersService.changepass(id, updatePassUserDto);
  }
  
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles('ADMIN')
  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
} 
