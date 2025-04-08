import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullMqModule } from './pull-mq/pull-mq.module';
import { DatabaseModule } from './database/database.module';
import { DeadLetterModule } from './jobs/dead-letter/dead-letter.module';
import { UsersRepository } from './database/repositories/users.repository';
import { UsersModule } from './services/users/users/users.module';
import { AuthModule } from './services/users/auth/auth.module';

@Module({
  imports: [
    PullMqModule,
    DatabaseModule,
    DeadLetterModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}
