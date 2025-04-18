import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullMqModule } from './pull-mq/pull-mq.module';
import { DatabaseModule } from './database/database.module';
import { DeadLetterModule } from './jobs/dead-letter/dead-letter.module';
import { UsersModule } from './modules/users/users/users.module';
import { AuthModule } from './modules/users/auth/auth.module';

@Module({
    imports: [
        PullMqModule,
        DatabaseModule,
        DeadLetterModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
