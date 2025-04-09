import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeadLetterService } from './dead-letter.service';

@Injectable()
export class DeadLetterSchedule {
    constructor(private deadLetterService: DeadLetterService) {}

    @Cron('0 0 0 * * *')
    async handleDeadLetter() {
        await this.deadLetterService.handle();
    }
}
