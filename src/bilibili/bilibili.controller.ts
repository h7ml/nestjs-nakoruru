import { Controller, Get } from '@nestjs/common';
import { BilibiliService } from './bilibili.service';

@Controller('bilibili')
export class BilibiliController {
  constructor(private readonly bilibiliService: BilibiliService) { }

  @Get()
  async getBilibiliHot(): Promise<any> {
    try {
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
