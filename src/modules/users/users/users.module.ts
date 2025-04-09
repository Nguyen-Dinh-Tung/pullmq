import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import UsersModel from 'src/database/models/users.model';

@Module({
    imports: [SequelizeModule.forFeature([UsersModel])],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
