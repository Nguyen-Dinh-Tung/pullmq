import { BackoffProducerName } from 'src/pull-mq/backoff/backoff.consumer';

export enum EDeadLetter {
  BACKOFF = BackoffProducerName,
}
