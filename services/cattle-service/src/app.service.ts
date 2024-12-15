import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCattleDto } from './dto/create-cattle.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class CattleService {
  private readonly dbPath = path.join(__dirname, '..', 'cattle-db.json');

  async create(createCattleDto: CreateCattleDto) {
    try {
      const cattle = await this.findAll();
      // Add a unique identifier
      const newCattle = {
        ...createCattleDto,
        id: Date.now().toString(), // Simple unique ID generation
      };
      cattle.push(newCattle);
      await fs.writeFile(this.dbPath, JSON.stringify(cattle, null, 2));
      return newCattle;
    } catch (error) {
      throw new Error(`Could not create cattle: ${error.message}`);
    }
  }

  async findAll() {
    console.log(__dirname);
    try {
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async update(id: string, updateCattleDto: Partial<CreateCattleDto>) {
    try {
      const cattle = await this.findAll();
      const cattleIndex = cattle.findIndex((c) => c.id === id);

      if (cattleIndex === -1) {
        throw new NotFoundException(`Cattle with ID ${id} not found`);
      }

      // Merge existing cattle data with update
      cattle[cattleIndex] = {
        ...cattle[cattleIndex],
        ...updateCattleDto,
        id, // Ensure ID remains the same
      };

      await fs.writeFile(this.dbPath, JSON.stringify(cattle, null, 2));
      return cattle[cattleIndex];
    } catch (error) {
      throw new Error(`Could not update cattle: ${error.message}`);
    }
  }

  async delete(id: string) {
    try {
      const cattle = await this.findAll();
      const initialLength = cattle.length;

      const filteredCattle = cattle.filter((c) => c.id !== id);

      if (filteredCattle.length === initialLength) {
        throw new NotFoundException(`Cattle with ID ${id} not found`);
      }

      await fs.writeFile(this.dbPath, JSON.stringify(filteredCattle, null, 2));
      return { message: `Cattle with ID ${id} deleted successfully` };
    } catch (error) {
      throw new Error(`Could not delete cattle: ${error.message}`);
    }
  }
}
