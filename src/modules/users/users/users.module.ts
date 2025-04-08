import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/database/repositories/users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
