import { Module } from '@nestjs/common';
import { EdgesController } from './edges.controller';
import { EdgesService } from './edges.service';

@Module({
  controllers: [EdgesController],
  providers: [EdgesService],
})
export class EdgesModule {}
