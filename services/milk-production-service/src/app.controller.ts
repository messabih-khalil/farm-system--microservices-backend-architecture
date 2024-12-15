import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import { MilkProductionService } from './app.service';

@Controller('milk-production')
export class MilkProductionController {
  constructor(private readonly milkProductionService: MilkProductionService) {}

  @Post()
  create(@Body() createMilkProductionDto: CreateMilkProductionDto) {
    return this.milkProductionService.create(createMilkProductionDto);
  }

  @Get()
  findAll() {
    return this.milkProductionService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMilkProductionDto: Partial<CreateMilkProductionDto>,
  ) {
    return this.milkProductionService.update(id, updateMilkProductionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.milkProductionService.delete(id);
  }
}
