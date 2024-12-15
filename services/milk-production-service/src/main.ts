import { NestFactory } from '@nestjs/core';
import { MilkProductionModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MilkProductionModule);
  app.enableCors();
  await app.listen(3004);
}
bootstrap();
