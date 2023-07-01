import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsqqService } from './newsqq.service';

@Controller('hotapi/newsqq')
@ApiTags('hotapi')
@ApiTags('腾讯新闻')
export class NewsqqController {
  constructor(private readonly newsqqService: NewsqqService) {}

  @Get()
  @ApiOperation({ summary: '获取腾讯热点榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getNewsqq() {
    return this.newsqqService.getNewsqq();
  }

  @Get('/new')
  @ApiOperation({ summary: '获取腾讯热点榜 - 最新数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getNewNewsqq() {
    return this.newsqqService.getNewNewsqq();
  }
}
