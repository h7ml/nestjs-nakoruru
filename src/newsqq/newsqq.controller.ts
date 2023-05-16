import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsqqService } from './newsqq.service';

@Controller('newsqq')
@ApiTags('腾讯新闻')
export class NewsqqController {
  constructor(private readonly newsqqService: NewsqqService) { }

  @Get()
  @ApiOperation({ summary: '获取腾讯热点榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getNewsqq(): Promise<any> {
    return this.newsqqService.getNewsqq();
  }
}
