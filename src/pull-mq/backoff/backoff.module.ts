import { BackoffProducer } from './backoff.producer';
import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { BackOffConsumer, BackoffProducerName } from './backoff.consumer';
import { BackoffService } from './backoff.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BackoffProducerName,
      redis: {
        port: 6379,
        host: '127.0.0.1',
      },
    }),
    forwardRef(() => BackOffModule),
  ],
  providers: [BackOffConsumer, BackoffProducer, BackoffService],
  exports: [BackOffConsumer, BackoffProducer, BackoffService],
})
export class BackOffModule {}
