// MedicalExaminationService
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalExaminationDto } from './dto/create-medical-examination.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MedicalExaminationService {
  private readonly dbPath = path.join(
    __dirname,
    '..',
    'medical-examinations-db.json',
  );

  async create(createMedicalExaminationDto: CreateMedicalExaminationDto) {
    try {
      const examinations = await this.findAll();
      // Add a unique identifier
      const newExamination = {
        ...createMedicalExaminationDto,
        id: Date.now().toString(), // Simple unique ID generation
      };
      examinations.push(newExamination);
      await fs.writeFile(this.dbPath, JSON.stringify(examinations, null, 2));
      return newExamination;
    } catch (error) {
      throw new Error(`Could not create medical examination: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async update(
    id: string,
    updateMedicalExaminationDto: Partial<CreateMedicalExaminationDto>,
  ) {
    try {
      const examinations = await this.findAll();
      const examinationIndex = examinations.findIndex((exam) => exam.id === id);

      if (examinationIndex === -1) {
        throw new NotFoundException(
          `Medical Examination with ID ${id} not found`,
        );
      }

      // Merge existing examination data with update
      examinations[examinationIndex] = {
        ...examinations[examinationIndex],
        ...updateMedicalExaminationDto,
        id, // Ensure ID remains the same
      };

      await fs.writeFile(this.dbPath, JSON.stringify(examinations, null, 2));
      return examinations[examinationIndex];
    } catch (error) {
      throw new Error(`Could not update medical examination: ${error.message}`);
    }
  }

  async delete(id: string) {
    try {
      const examinations = await this.findAll();
      const initialLength = examinations.length;

      const filteredExaminations = examinations.filter(
        (exam) => exam.id !== id,
      );

      if (filteredExaminations.length === initialLength) {
        throw new NotFoundException(
          `Medical Examination with ID ${id} not found`,
        );
      }

      await fs.writeFile(
        this.dbPath,
        JSON.stringify(filteredExaminations, null, 2),
      );
      return {
        message: `Medical Examination with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new Error(`Could not delete medical examination: ${error.message}`);
    }
  }
}
