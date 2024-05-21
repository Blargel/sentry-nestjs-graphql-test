import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://5ecdb126a67c48d0962a5e271d9d1580@o4507261647716352.ingest.us.sentry.io/4507266968125440',
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
