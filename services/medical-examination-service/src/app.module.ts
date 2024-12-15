import { Module } from '@nestjs/common';
import { MedicalExaminationController } from './app.controller';
import { MedicalExaminationService } from './app.service';

@Module({
  controllers: [MedicalExaminationController],
  providers: [MedicalExaminationService],
})
export class MedicalExaminationModule {}
