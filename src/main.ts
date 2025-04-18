import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AllFilterException } from './exceptions/all-filter.exception';
import { logger } from './logger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api/v1');

    morgan.token('body', function (req: any) {
        return JSON.stringify(req?.body ?? '{}');
    });
    morgan.token('query', function (req: any) {
        return JSON.stringify(req?.query ?? '{}');
    });
    morgan.token('params', function (req: any) {
        return JSON.stringify(req?.params ?? '{}');
    });
    morgan.token('user', function (req: any) {
        return JSON.stringify(req?.headers?.user ?? '{}');
    });

    app.use(bodyParser.json());

    app.use(
        morgan(
            ':remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" data::body - Query: :query - Params: :params - User: :user  :response-time ms',
            {
                skip: function (req, res) {
                    return res.statusCode < 400;
                },
                stream: {
                    write: (message: string) => {
                        logger.info('HTTP', message.trim());
                    },
                },
            },
        ),
    );

    app.set('struct proxy', true);

    app.enableCors({
        credentials: true,
        origin: true,
    });
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidUnknownValues: true,
        }),
    );

    app.useGlobalFilters(new AllFilterException(httpAdapter));

    await app.listen(3001);
}
bootstrap();
