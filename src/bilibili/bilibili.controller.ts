import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BilibiliService } from './bilibili.service';

@ApiTags('bilibili')
@Controller('bilibili')
export class BilibiliController {
  // 注入哔哩哔哩服务
  constructor(private readonly bilibiliService: BilibiliService) { }

  @Get()
  @ApiOperation({ summary: '获取哔哩哔哩热门榜' })
  @ApiResponse({ status: 200, description: '获取哔哩哔哩热门榜' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getBilibiliHot(): Promise<any> {
    try {
      // 使用服务获取哔哩哔哩热门榜数据
      const data = await this.bilibiliService.getHotList();
      return {
        code: 200,
        message: '获取成功',
        title: '哔哩哔哩',
        subtitle: '热门榜',
        total: data.length,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        title: '哔哩哔哩',
        subtitle: '热门榜',
        message: '获取失败',
      };
    }
  }
}
