import { Module } from '@nestjs/common';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';

@Module({
  controllers: [NodesController],
  providers: [NodesService]
})
export class NodesModule {}
