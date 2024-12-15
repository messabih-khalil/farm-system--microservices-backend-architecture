import { NestFactory } from '@nestjs/core';
import { BirthRegistrationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(BirthRegistrationModule);
  app.enableCors();
  await app.listen(3003);
}
bootstrap();
