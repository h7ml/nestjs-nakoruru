import { Module } from '@nestjs/common';
import { NewsqqController } from './newsqq.controller';
import { NewsqqService } from './newsqq.service';

@Module({
  controllers: [NewsqqController],
  providers: [NewsqqService],
})
export class NewsqqModule {}
