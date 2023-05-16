import { Module } from '@nestjs/common';
import { TiebaService } from './tieba.service';
import { TiebaController } from './tieba.controller';

@Module({
  providers: [TiebaService],
  controllers: [TiebaController],
})
export class TiebaModule { }
