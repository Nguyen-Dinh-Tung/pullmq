import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BackOffModule } from './backoff/backoff.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BackOffModule,
  ],
  exports: [BullModule, BackOffModule],
})
export class PullMqModule {}
