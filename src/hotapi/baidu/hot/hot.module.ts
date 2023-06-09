import { Module } from '@nestjs/common';
import { HotController } from './hot.controller';
import { HotService } from './hot.service';

@Module({
  controllers: [HotController],
  providers: [HotService],
})
export class HotModule {}
