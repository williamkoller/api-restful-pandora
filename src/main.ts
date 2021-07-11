import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ModelNotFoundException } from '@/common/filters/model-not-found.exception.filter';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { swaggerConfig } from '@/docs/swagger-config';

const key = 'fetch';

global[key] = require('node-fetch');

declare const module: any;

async function bootstrap(): Promise<void> {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ModelNotFoundException());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  swaggerConfig(app);
  await app.listen(process.env.PORT, () => logger.log(`App running 🔥`));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
