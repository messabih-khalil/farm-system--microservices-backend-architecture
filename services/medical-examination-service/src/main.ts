import { NestFactory } from '@nestjs/core';
import { MedicalExaminationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MedicalExaminationModule);
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
