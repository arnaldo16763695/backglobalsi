import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePassUserDto } from './dto/update-password-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('ADMIN')
  @Patch('changepass/:id')
  changepass(
    @Param('id') id: string,
    @Body() updatePassUserDto: UpdatePassUserDto,
  ) {
    return this.usersService.changepass(id, updatePassUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
  })
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

  @Get('profile/:id')
  findOneProfile(@Request() req: any) {
    return this.usersService.findOneProfile(this.getUserId(req));
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('profile/:id')
  updateProfile(@Request() req: any, @Body() updateUserDto: UpdateProfileDto) {
    return this.usersService.updateProfile(this.getUserId(req), updateUserDto);
  }

  @Patch('profile/:id/:fromId')
  updateProfileLegacy(
    @Request() req: any,
    @Body() updateUserDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(this.getUserId(req), updateUserDto);
  }

  @Patch('changepassprofile/:id/:fromId')
  changepassProfile(
    @Request() req: any,
    @Body() updatePassUserDto: UpdatePassUserDto,
  ) {
    return this.usersService.changepassProfile(
      this.getUserId(req),
      updatePassUserDto,
    );
  }

  @Roles('ADMIN')
  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  private getUserId(req: any): string {
    return req.user?.sub ?? req.user?.id;
  }
}
