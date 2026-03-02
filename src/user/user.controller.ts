import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './user.interface';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterface: UserInterface
  ) {}

  @Get('test')
  test(): string[] {
    return this.userService.test();
  }

  @Get()
  findAll(): string[] {
    return this.userInterface.findAll();
  }
}