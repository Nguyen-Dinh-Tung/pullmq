import { DeadLetterService } from './dead-letter.service';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DeadLetterRepository } from 'src/database/repositories/dead-letter.repository';
import { PullMqModule } from 'src/pull-mq/pull-mq.module';

@Module({
  imports: [ScheduleModule.forRoot(), PullMqModule],
  providers: [DeadLetterRepository, DeadLetterService],
  exports: [DeadLetterRepository, DeadLetterService],
})
export class DeadLetterModule {}
