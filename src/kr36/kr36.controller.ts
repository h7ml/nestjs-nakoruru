import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

interface KrResponse {
  data: {
    hotRankList(hotRankList: any): unknown;
    data: any[];
  };
}

@Controller('36kr')
export class KrController {
  private readonly url =
    'https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot';
  private readonly cacheKey = 'krData';
  private updateTime = new Date().toISOString();

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.itemId,
        title: v.templateMaterial.widgetTitle,
        pic: v.templateMaterial.widgetImage,
        owner: v.templateMaterial.authorName,
        hot: v.templateMaterial.statRead,
        data: v.templateMaterial,
        url: `https://www.36kr.com/p/${v.itemId}`,
        mobileUrl: `https://www.36kr.com/p/${v.itemId}`,
      };
    });
  }

  @Get()
  async getKr() {
    try {
      const response = await axios.post(this.url, {
        partner_id: 'wap',
        param: {
          siteId: 1,
          platformId: 2,
        },
      });
      const json = response.data as KrResponse;
      const data = this.getData(json.data.hotRankList);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '36氪',
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
  async getNewKr() {
    try {
      const response = await axios.post(this.url, {
        partner_id: 'wap',
        param: {
          siteId: 1,
          platformId: 2,
        },
      });
      const json = response.data as KrResponse;
      const newData = this.getData(json.data.hotRankList);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '36氪',
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
