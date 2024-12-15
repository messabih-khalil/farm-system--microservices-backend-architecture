import { Module } from '@nestjs/common';
import { CattleController } from './app.controller';
import { CattleService } from './app.service';

@Module({
  controllers: [CattleController],
  providers: [CattleService],
})
export class CattleModule {}
