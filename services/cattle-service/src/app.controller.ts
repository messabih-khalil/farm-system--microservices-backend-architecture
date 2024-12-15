// CattleController
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateCattleDto } from './dto/create-cattle.dto';
import { CattleService } from './app.service';

@Controller('cattle')
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post()
  create(@Body() createCattleDto: CreateCattleDto) {
    return this.cattleService.create(createCattleDto);
  }

  @Get()
  findAll() {
    return this.cattleService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCattleDto: Partial<CreateCattleDto>,
  ) {
    return this.cattleService.update(id, updateCattleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cattleService.delete(id);
  }
}
