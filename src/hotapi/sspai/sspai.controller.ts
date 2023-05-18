import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { SspaiService } from './sspai.service';

@Controller('hotapi/sspai')
@ApiTags('少数派')
export class SspaiController {
  constructor(private readonly sspaiService: SspaiService) {}

  @Get()
  @ApiOperation({ summary: '获取少数派热榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getSspai() {
    return this.sspaiService.getSspai();
  }

  @Get('new')
  @ApiOperation({ summary: '获取少数派热榜 - 最新数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getNewSspai() {
    return this.sspaiService.getNewSspai();
  }
}
