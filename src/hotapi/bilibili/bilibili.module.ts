import { Module } from '@nestjs/common';
import { BilibiliService } from './bilibili.service';
import { BilibiliController } from './bilibili.controller';

@Module({
  providers: [BilibiliService],
  controllers: [BilibiliController],
})
export class BilibiliModule {}
