import { Module } from '@nestjs/common';
import { MilkProductionController } from './app.controller';
import { MilkProductionService } from './app.service';

@Module({
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
