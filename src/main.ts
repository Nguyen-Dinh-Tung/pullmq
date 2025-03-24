import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AllFilterException } from './exceptions/all-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');

  morgan.token('body', function (req: any) {
    return JSON.stringify(req?.body ?? '{}');
  });

  app.use(
    morgan(
      ':remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" data::body :response-time ms',
      {
        skip: function (req, res) {
          return res.statusCode < 400;
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
