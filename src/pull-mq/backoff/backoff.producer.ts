import { InjectQueue } from '@nestjs/bull';
import { BackoffProducerName, IBackOff } from './backoff.consumer';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { PullMQProducer } from '../pull-mq.abstract';

@Injectable()
export class BackoffProducer extends PullMQProducer<IBackOff> {
  constructor(
    @InjectQueue(BackoffProducerName)
    protected readonly queue: Queue,
  ) {
    super(queue, BackoffProducerName);
    this.queueName = BackoffProducerName;
  }
}
