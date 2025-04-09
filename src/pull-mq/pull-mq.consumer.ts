import { Job, JobStatus, Queue } from 'bull';
import { OnQueueError, Process } from '@nestjs/bull';
import { JobQueue, PullMQProducer } from './pull-mq.producer';
import { logger } from 'src/logger';

export abstract class PullMQConsumer<
    T extends JobQueue,
> extends PullMQProducer<T> {
    protected retryCounts: number = 0;
    private handlers: Map<string, (job: Job<T>) => Promise<any>> = new Map();
    constructor(
        protected queue: Queue,
        name: string,
    ) {
        super(queue, name);
        this.queue.on('job_completed', (data) => {
            logger.info(`[PULL-MQ-SUCCESS]`, data.toString());
        });
        this.queue.on('error', (error) => {
            logger.error(`[PULL-MQ] `, error?.message, error?.stack);
        });
    }

    registerHandler(
        jobType: string,
        handler: (job: Job<T>) => Promise<any>,
    ): void {
        this.handlers.set(jobType, handler);
    }

    @Process()
    async consumer(job: Job<T>): Promise<boolean> {
        this.retryCounts = this.retryCounts ?? 0;
        try {
            const processResult = await this.handlers.get(job.data['name'])(
                job,
            );

            if (processResult) {
                await job.progress(100);
                this.queue.emit('job_completed', {
                    jobId: job.id,
                    data: processResult,
                });
                await job.remove();
            }

            return true;
        } catch (error) {
            this.queue.emit('error', JSON.stringify(job));
            logger.error(`[PULL-MQ] `, error?.message, error?.stack);

            await this.handleRePub(job);
            await job.remove();
        }
    }

    async handleRePub(job: Job<T>) {
        logger.info(
            `[${this.getQueueName()}]`,
            `Handle rePub job :${job.data.toString()}`,
        );
        let delay = this.getCalculateBackoff(this.getBackoffType());
        job.data.retries += 1;

        if (job.data.retries > this.getMaxRetries()) {
            delay = 0;
            Object.assign(job.data, { name: this.getDeadLetterQueue() });
        }
        await this.addJob(job.data, { ...job.opts, delay });
    }

    @OnQueueError()
    handleError(error: Error): void {
        logger.error(`[${this.getQueueName()}]`, error.message, error.stack);
    }

    async getJobs(type: JobStatus[]): Promise<Job<T>[]> {
        return await this.queue.getJobs(type);
    }
}
