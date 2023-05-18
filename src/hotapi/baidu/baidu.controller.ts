import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';

interface BaiduResponse {
  cards: {
    content: any[];
  }[];
}

@ApiTags('百度热搜')
@Controller('iotapi/baidu')
export class BaiduController {
  private readonly url = 'https://top.baidu.com/board?tab=realtime';
  private readonly cacheKey = 'baiduData';
  private updateTime = new Date().toISOString();

  // 数据处理方法
  private getData(data): any[] {
    if (!data) return [];
    try {
      const pattern = /<\!--s-data:(.*?)-->/s;
      const matchResult = data.match(pattern);
      const jsonObject = JSON.parse(matchResult[1]).cards[0].content;
      return jsonObject.map((v) => {
        return {
          title: v.query,
          desc: v.desc,
          pic: v.img,
          hot: Number(v.hotScore),
          url: `https://www.baidu.com/s?wd=${encodeURIComponent(v.query)}`,
          mobileUrl: v.url,
        };
      });
    } catch (error) {
      console.error('数据处理出错' + error);
    }
  }

  @Get()
  @ApiOperation({ summary: '获取百度热搜榜' })
  @ApiResponse({ status: 200, description: '获取百度热搜榜' })
  async getBaidu() {
    try {
      const response = await axios.get(this.url);
      const data = this.getData(response.data);
      this.updateTime = new Date().toISOString();
      if (!data) {
        throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return {
        code: 200,
        message: '获取成功',
        title: '百度',
        subtitle: '热搜榜',
        total: data.length,
        updateTime: this.updateTime,
        data,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new')
  @ApiOperation({ summary: '获取百度热搜榜的最新数据' })
  @ApiResponse({ status: 200, description: '获取百度热搜榜的最新数据' })
  async getNewBaidu() {
    try {
      const response = await axios.get(this.url);
      const newData = this.getData(response.data);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '百度',
        subtitle: '热搜榜',
        total: newData.length,
        updateTime: this.updateTime,
        data: newData,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
