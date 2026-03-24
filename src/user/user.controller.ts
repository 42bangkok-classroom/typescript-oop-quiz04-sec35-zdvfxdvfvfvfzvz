import { Controller, Get, Post, Param, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test(): string[] {
    return this.userService.test();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string) {
    const fieldArr = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, fieldArr);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
