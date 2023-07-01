import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Node } from './node.interface';
import { NodesService } from './nodes.service';

@ApiTags('react flow ')
@ApiTags('hotapi')
@Controller('react-flow/nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Get()
  @ApiOperation({ summary: 'Get react flow nodes' })
  @ApiResponse({
    status: 200,
    description: 'Get react flow nodes successfully',
  })
  @ApiResponse({ status: 500, description: 'Failed to get react flow nodes' })
  @ApiResponse({
    status: 200,
    description: 'Get nodes successfully',
    isArray: true,
  })
  getNodes(): { code: number; data: Node[]; message: string } {
    const nodes = this.nodesService.getNodes();
    return {
      code: 200,
      data: nodes,
      message: 'success',
    };
  }
}
