import { Controller, Get } from '@nestjs/common';
import { DoubanService } from './douban.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Douban } from './douban-item.model';

@ApiTags('douban')
@Controller('iotapi/douban')
export class DoubanController {
  constructor(private doubanService: DoubanService) {}

  @Get()
  @ApiOperation({ summary: '获取豆瓣热门话题' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    type: Douban,
  })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getDouban(): Promise<Douban> {
    const { data } = await this.doubanService.getDouban();
    return {
      count: data.length,
      data: data,
    };
  }
}
