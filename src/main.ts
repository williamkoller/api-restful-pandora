import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ModelNotFoundException } from '@/common/filters/model-not-found.exception.filter';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { swaggerConfig } from '@/docs/swagger-config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { configService } from '@/infra/db/config/config.service';
import { SentryInterceptor } from '@/modules/core/interceptors/sentry.intercepor';
import * as Sentry from '@sentry/node';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const { environment, dsn } = configService.getSentryConfig();

  Sentry.init({ environment, dsn });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ModelNotFoundException(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor(), new SentryInterceptor());

  swaggerConfig(app);

  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: '*',
  });

  await app.listen(process.env.PORT, () => logger.log(`App running 🔥`));
}
bootstrap();
