import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';

interface KrResponse {
  data: {
    hotRankList: any[];
  };
}

@ApiTags('hotapi')
@Controller('hotapi/36kr')
export class KrController {
  private readonly url =
    'https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot';
  private readonly cacheKey = 'krData';
  private updateTime = new Date().toISOString();

  // 数据处理方法
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
  @ApiOperation({ summary: '获取36氪热榜' })
  @ApiResponse({ status: 200, description: '获取36氪热榜成功' })
  @ApiResponse({ status: 500, description: '获取36氪热榜失败' })
  async getKr() {
    try {
      // 从36氪获取热榜数据
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
  @ApiOperation({ summary: '获取最新36氪热榜' })
  @ApiResponse({ status: 200, description: '获取最新36氪热榜成功' })
  @ApiResponse({ status: 500, description: '获取最新36氪热榜失败' })
  async getNewKr() {
    try {
      // 从36氪获取最新热榜数据
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
