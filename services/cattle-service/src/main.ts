import { NestFactory } from '@nestjs/core';
import { CattleModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(CattleModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
