import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

interface JuejinResponse {
  data: {
    data: any[];
  };
}

@Controller('juejin')
export class JuejinController {
  private readonly url =
    'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot';
  private readonly cacheKey = 'juejinData';
  private updateTime = new Date().toISOString();

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.content.content_id,
        title: v.content.title,
        hot: v.content_counter.hot_rank,
        url: `https://juejin.cn/post/${v.content.content_id}`,
        mobileUrl: `https://juejin.cn/post/${v.content.content_id}`,
      };
    });
  }

  @Get()
  async getJuejin() {
    try {
      const response = await axios.get(this.url);
      const json = response.data as JuejinResponse;
      const data = this.getData(json.data);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '稀土掘金',
        subtitle: '热榜',
        total: data.length,
        updateTime: this.updateTime,
        data,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new')
  async getNewJuejin() {
    try {
      const response = await axios.get(this.url);
      const json = response.data as JuejinResponse;
      const newData = this.getData(json.data);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '稀土掘金',
        subtitle: '热榜',
        total: newData.length,
        updateTime: this.updateTime,
        data: newData,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
