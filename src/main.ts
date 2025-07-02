import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 👇 Cast to NestExpressApplication to enable Express-specific methods
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Enable class-validator globally
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
  // Serve static files from /tmp under the /voice path
  // app.useStaticAssets('/tmp', {
  //   prefix: '/voice',
  // });
  await app.listen(3000);
}
bootstrap();
