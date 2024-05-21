import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

const DSN = '';

Sentry.init({
  dsn: DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.setupNestErrorHandler(
    app,
    new BaseExceptionFilter(app.getHttpAdapter()),
  );
  await app.listen(3000);
}
bootstrap();
