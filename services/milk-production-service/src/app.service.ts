// MilkProductionService
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MilkProductionService {
  private readonly dbPath = path.join(
    __dirname,
    '..',
    'milk-production-db.json',
  );

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    try {
      const milkProductions = await this.findAll();
      // Add a unique identifier
      const newMilkProduction = {
        ...createMilkProductionDto,
        id: Date.now().toString(), // Simple unique ID generation
      };
      milkProductions.push(newMilkProduction);
      await fs.writeFile(this.dbPath, JSON.stringify(milkProductions, null, 2));
      return newMilkProduction;
    } catch (error) {
      throw new Error(
        `Could not create milk production record: ${error.message}`,
      );
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
    updateMilkProductionDto: Partial<CreateMilkProductionDto>,
  ) {
    try {
      const milkProductions = await this.findAll();
      const milkProductionIndex = milkProductions.findIndex(
        (record) => record.id === id,
      );

      if (milkProductionIndex === -1) {
        throw new NotFoundException(
          `Milk Production record with ID ${id} not found`,
        );
      }

      // Merge existing milk production data with update
      milkProductions[milkProductionIndex] = {
        ...milkProductions[milkProductionIndex],
        ...updateMilkProductionDto,
        id, // Ensure ID remains the same
      };

      await fs.writeFile(this.dbPath, JSON.stringify(milkProductions, null, 2));
      return milkProductions[milkProductionIndex];
    } catch (error) {
      throw new Error(
        `Could not update milk production record: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const milkProductions = await this.findAll();
      const initialLength = milkProductions.length;

      const filteredMilkProductions = milkProductions.filter(
        (record) => record.id !== id,
      );

      if (filteredMilkProductions.length === initialLength) {
        throw new NotFoundException(
          `Milk Production record with ID ${id} not found`,
        );
      }

      await fs.writeFile(
        this.dbPath,
        JSON.stringify(filteredMilkProductions, null, 2),
      );
      return {
        message: `Milk Production record with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new Error(
        `Could not delete milk production record: ${error.message}`,
      );
    }
  }
}
