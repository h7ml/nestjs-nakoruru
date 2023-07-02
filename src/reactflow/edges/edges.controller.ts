import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Edge } from './edge.interface';
import { EdgesService } from './edges.service';

@ApiTags('react flow')
@Controller('react-flow/edges')
export class EdgesController {
  constructor(private readonly edgesService: EdgesService) {}

  @Get()
  @ApiOperation({ summary: 'react flow edges' })
  @ApiResponse({ status: 200, description: '获取react flow edges成功' })
  @ApiResponse({ status: 500, description: '获取react flow edges失败' })
  @ApiResponse({
    status: 200,
    description: 'Get edges successfully',
    isArray: true,
  })
  getEdges(): { code: number; data: Edge[]; message: string } {
    const edges = this.edgesService.getEdges();
    return {
      code: 200,
      data: edges,
      message: 'success',
    };
  }
}
