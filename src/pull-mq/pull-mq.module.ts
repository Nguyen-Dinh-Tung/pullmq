import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BackOffModule } from './backoff/backoff.module';
import { DeadLetterConsumer } from './dead-letter.consumer';
import { deadLetterQueueName } from './pull-mq.producer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: deadLetterQueueName,
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BackOffModule,
  ],
  providers: [DeadLetterConsumer],
  exports: [BullModule, BackOffModule, DeadLetterConsumer],
})
export class PullMqModule {}
