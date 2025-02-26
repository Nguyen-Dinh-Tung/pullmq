import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import UsersModel from './database/models/users.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const user = await UsersModel.findAll();
    return user;
  }
}
