import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullMqModule } from './pull-mq/pull-mq.module';
import { DatabaseModule } from './database/database.module';
import { UsersRepository } from './database/models/users.repository';

@Module({
  imports: [PullMqModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}
