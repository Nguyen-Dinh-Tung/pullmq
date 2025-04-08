import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BackOffModule } from './backoff/backoff.module';
import { DeadLetterConsumer } from './dead-letter.consumer';
import { deadLetterQueueName } from './pull-mq.producer';
import ENV from 'src/env/env.base';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: ENV.redisHost,
        port: +ENV.redisPort,
      },
    }),
    BullModule.registerQueue({
      name: deadLetterQueueName,
      redis: {
        host: ENV.redisHost,
        port: +ENV.redisPort,
      },
    }),
    BackOffModule,
  ],
  providers: [DeadLetterConsumer],
  exports: [BullModule, BackOffModule, DeadLetterConsumer],
})
export class PullMqModule {}
