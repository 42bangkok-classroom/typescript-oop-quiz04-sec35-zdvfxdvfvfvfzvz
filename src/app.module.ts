import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInterface } from './user/user.interface';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, UserInterface],
})
export class AppModule {}
