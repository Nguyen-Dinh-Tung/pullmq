import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config';
console.log(sequelizeConfig, 'sequelizeConfig');

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig)],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
