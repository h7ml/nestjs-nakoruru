import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToutiaoService } from './toutiao.service';

@Controller('toutiao')
@ApiTags('今日头条')
export class ToutiaoController {
  constructor(private readonly toutiaoService: ToutiaoService) { }

  @Get()
  @ApiOperation({ summary: '获取头条热榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getToutiao() {
    return await this.toutiaoService.getToutiao();
  }

  @Get('new')
  @ApiOperation({ summary: '获取头条热榜 - 最新数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getNewToutiao() {
    return await this.toutiaoService.getNewToutiao();
  }
}
