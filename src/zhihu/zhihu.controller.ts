import { Controller, Get } from '@nestjs/common';
import { ZhihuService } from './zhihu.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('知乎')
@Controller('zhihu')
export class ZhihuController {
  constructor(private readonly zhihuService: ZhihuService) {}

  @Get()
  @ApiOperation({ summary: '获取知乎热榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getZhihuHot() {
    return this.zhihuService.getZhihuHot();
  }

  @Get('new')
  @ApiOperation({ summary: '获取最新的知乎热榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getZhihuHotNew() {
    return this.zhihuService.getZhihuHotNew();
  }
}
