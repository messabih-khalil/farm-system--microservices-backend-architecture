import { Module } from '@nestjs/common';
import { BirthRegistrationController } from './app.controller';
import { BirthRegistrationService } from './app.service';

@Module({
  controllers: [BirthRegistrationController],
  providers: [BirthRegistrationService],
})
export class BirthRegistrationModule {}
