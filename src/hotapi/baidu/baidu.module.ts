import { Module } from '@nestjs/common';
import { BaiduController } from './baidu.controller';

@Module({
  controllers: [BaiduController],
})
export class BaiduModule {}
