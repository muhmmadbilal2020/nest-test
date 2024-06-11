import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4002);
  Logger.log(`🚀 Application is running on: http://localhost:4002`);
}
bootstrap();
