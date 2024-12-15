import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBirthDto } from './dto/create-birth.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class BirthRegistrationService {
  private readonly dbPath = path.join(
    __dirname,
    '..',
    'birth-registrations-db.json',
  );

  async create(createBirthDto: CreateBirthDto) {
    try {
      const births = await this.findAll();
      // Add a unique identifier (e.g., timestamp or incremental ID)
      const newBirth = {
        ...createBirthDto,
        id: Date.now().toString(), // Simple unique ID generation
      };
      births.push(newBirth);
      await fs.writeFile(this.dbPath, JSON.stringify(births, null, 2));
      return newBirth;
    } catch (error) {
      throw new Error(`Could not register birth: ${error.message}`);
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

  async update(id: string, updateBirthDto: Partial<CreateBirthDto>) {
    try {
      const births = await this.findAll();
      const birthIndex = births.findIndex((birth) => birth.id === id);

      if (birthIndex === -1) {
        throw new NotFoundException(
          `Birth registration with ID ${id} not found`,
        );
      }

      // Merge existing birth data with update
      births[birthIndex] = {
        ...births[birthIndex],
        ...updateBirthDto,
        id, // Ensure ID remains the same
      };

      await fs.writeFile(this.dbPath, JSON.stringify(births, null, 2));
      return births[birthIndex];
    } catch (error) {
      throw new Error(`Could not update birth registration: ${error.message}`);
    }
  }

  async delete(id: string) {
    try {
      const births = await this.findAll();
      const initialLength = births.length;

      const filteredBirths = births.filter((birth) => birth.id !== id);

      if (filteredBirths.length === initialLength) {
        throw new NotFoundException(
          `Birth registration with ID ${id} not found`,
        );
      }

      await fs.writeFile(this.dbPath, JSON.stringify(filteredBirths, null, 2));
      return {
        message: `Birth registration with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new Error(`Could not delete birth registration: ${error.message}`);
    }
  }
}
