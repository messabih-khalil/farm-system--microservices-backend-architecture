import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateBirthDto } from './dto/create-birth.dto';
import { BirthRegistrationService } from './app.service';

@Controller('birth-registrations')
export class BirthRegistrationController {
  constructor(
    private readonly birthRegistrationService: BirthRegistrationService,
  ) {}

  @Post()
  create(@Body() createBirthDto: CreateBirthDto) {
    console.log(createBirthDto);
    return this.birthRegistrationService.create(createBirthDto);
  }

  @Get()
  findAll() {
    console.log('GET BIRTHS');

    return this.birthRegistrationService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBirthDto: Partial<CreateBirthDto>,
  ) {
    return this.birthRegistrationService.update(id, updateBirthDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.birthRegistrationService.delete(id);
  }
}
