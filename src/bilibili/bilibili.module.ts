import { Module } from '@nestjs/common';
import { BilibiliController } from './bilibili.controller';

@Module({
  controllers: [BilibiliController]
})
export class BilibiliModule {}
