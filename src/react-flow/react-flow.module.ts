import { Module } from '@nestjs/common';
import { ReactFlowController } from './react-flow.controller';
import { ReactFlowService } from './react-flow.service';
import { NodesModule } from './nodes/nodes.module';
import { EdgesModule } from './edges/edges.module';

@Module({
  controllers: [ReactFlowController],
  providers: [ReactFlowService],
  imports: [NodesModule, EdgesModule],
})
export class ReactFlowModule {}
