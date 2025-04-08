import { BackoffProducer } from './backoff.producer';
import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { BackOffConsumer, BackoffProducerName } from './backoff.consumer';
import { BackoffService } from './backoff.service';
import ENV from 'src/env/env.base';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BackoffProducerName,
      redis: {
        host: ENV.redisHost,
        port: +ENV.redisPort,
      },
    }),
    forwardRef(() => BackOffModule),
  ],
  providers: [BackOffConsumer, BackoffProducer, BackoffService],
  exports: [BackOffConsumer, BackoffProducer, BackoffService],
})
export class BackOffModule {}
