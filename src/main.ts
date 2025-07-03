import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



// async function bootstrap() {
//   // 👇 Cast to NestExpressApplication to enable Express-specific methods
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   // Enable class-validator globally
//   app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
//   // Serve static files from /tmp under the /voice path
//   // app.useStaticAssets('/tmp', {
//   //   prefix: '/voice',
//   // });
//   await app.listen(3000);
// }
// bootstrap();



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // 🔥 Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Megavoice API')
    .setDescription('API documentation for Megavoice')
    .setVersion('1.0')
    .addBearerAuth() // Optional: adds Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI served at /api

  await app.listen(3000);
}
bootstrap();

