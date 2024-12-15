import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateMedicalExaminationDto } from './dto/create-medical-examination.dto';
import { MedicalExaminationService } from './app.service';

@Controller('medical-examinations')
export class MedicalExaminationController {
  constructor(
    private readonly medicalExaminationService: MedicalExaminationService,
  ) {}

  @Post()
  create(@Body() createMedicalExaminationDto: CreateMedicalExaminationDto) {
    return this.medicalExaminationService.create(createMedicalExaminationDto);
  }

  @Get()
  findAll() {
    return this.medicalExaminationService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalExaminationDto: Partial<CreateMedicalExaminationDto>,
  ) {
    return this.medicalExaminationService.update(
      id,
      updateMedicalExaminationDto,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.medicalExaminationService.delete(id);
  }
}
