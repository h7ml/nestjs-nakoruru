import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ToutiaoService {
  private readonly url =
    'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc';

  async getToutiao() {
    try {
      const response = await axios.get(this.url);
      return {
        code: 200,
        message: '获取成功',
        title: '今日头条',
        subtitle: '热榜',
        total: response.data.data.length,
        updateTime: new Date().toISOString(),
        data: this.processData(response.data.data),
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        title: '今日头条',
        subtitle: '热榜',
        message: '获取失败',
      };
    }
  }

  async getNewToutiao() {
    try {
      const response = await axios.get(this.url);
      return {
        code: 200,
        message: '获取成功',
        title: '今日头条',
        subtitle: '热榜',
        total: response.data.data.length,
        updateTime: new Date().toISOString(),
        data: this.processData(response.data.data),
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        title: '今日头条',
        subtitle: '热榜',
        message: '获取失败',
      };
    }
  }

  private processData(data) {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.ClusterId,
        title: v.Title,
        pic: v.Image.url,
        hot: v.HotValue,
        url: `https://www.toutiao.com/trending/${v.ClusterIdStr}/`,
        mobileUrl: `https://api.toutiaoapi.com/feoffline/amos_land/new/html/main/index.html?topic_id=${v.ClusterIdStr}`,
      };
    });
  }
}
