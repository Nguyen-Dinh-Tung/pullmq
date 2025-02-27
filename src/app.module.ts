import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullMqModule } from './pull-mq/pull-mq.module';
import { DatabaseModule } from './database/database.module';
import { DeadLetterModule } from './jobs/dead-letter/dead-letter.module';
import { UsersRepository } from './database/repositories/users.repository';

@Module({
  imports: [PullMqModule, DatabaseModule, DeadLetterModule],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}
