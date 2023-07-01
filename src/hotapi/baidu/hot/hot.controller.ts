import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotService } from './hot.service';

@ApiTags('hotapi')
@Controller('hotapi/baidu/hot')
export class HotController {
  constructor(private readonly hotService: HotService) {}

  @Get()
  @ApiOperation({ summary: '百度开发者热搜' })
  @ApiResponse({ status: 200, description: '获取百度开发者热搜成功' })
  @ApiResponse({ status: 500, description: '获取百度开发者热搜失败' })
  @ApiQuery({ name: 'pageNum', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  async getHotNews(
    @Query('pageNum') pageNum = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.hotService.getHotNews(pageNum, pageSize);
  }
}
