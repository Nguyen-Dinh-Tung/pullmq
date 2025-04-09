import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppHttpException } from './app-http.exception';
import { Response } from 'express';

export class AllFilterException extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        if (exception instanceof AppHttpException) {
            const res: Response = host.switchToHttp().getResponse();
            res.status(exception.getStatus()).json({
                code: exception.code,
                message: exception.message,
            });
            return;
        }
        super.catch(exception, host);
    }
}
