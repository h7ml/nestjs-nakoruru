import { Module } from '@nestjs/common';
import { ReactflowController } from './reactflow.controller';
import { ReactflowService } from './reactflow.service';
import { NodesModule } from './nodes/nodes.module';
import { EdgesModule } from './edges/edges.module';

@Module({
  controllers: [ReactflowController],
  providers: [ReactflowService],
  imports: [NodesModule, EdgesModule],
})
export class ReactflowModule {}
