import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BilibiliService } from './bilibili.service';

@ApiTags('hotapi')
@Controller('hotapi/bilibili')
export class BilibiliController {
  // 注入哔哩哔哩服务
  constructor(private readonly bilibiliService: BilibiliService) {}

  @Get()
  @ApiOperation({ summary: '获取哔哩哔哩热门榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getBilibili() {
    return this.bilibiliService.getBilibili();
  }
}
