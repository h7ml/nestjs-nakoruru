import { Module } from '@nestjs/common';
import { HupuController } from './hupu.controller';
import { HuPuService } from './hupu.service';

@Module({
  controllers: [HupuController],
  providers: [HuPuService],
})
export class HupuModule {}
