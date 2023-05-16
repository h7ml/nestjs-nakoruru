import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface SspaiResponse {
  code: number;
  data: any[];
}

@Injectable()
export class SspaiService {
  private readonly url =
    'https://sspai.com/api/v1/article/tag/page/get?limit=40&tag=热门文章';
  private updateTime = new Date().toISOString();

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.id,
        title: v.title,
        desc: v.summary,
        pic: `https://cdn.sspai.com/${v.banner}`,
        owner: v.author,
        hot: v.like_count,
        url: `https://sspai.com/post/${v.id}`,
        mobileUrl: `https://sspai.com/post/${v.itemId}`,
      };
    });
  }

  async getSspai() {
    try {
      const response = await axios.get(this.url);
      const json = response.data as SspaiResponse;
      const data = this.getData(json.data);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '少数派',
        subtitle: '最热',
        total: data.length,
        updateTime: this.updateTime,
        data,
      };
    } catch (error) {
      throw new Error('获取失败');
    }
  }

  async getNewSspai() {
    try {
      const response = await axios.get(this.url);
      const json = response.data as SspaiResponse;
      const newData = this.getData(json.data);
      this.updateTime = new Date().toISOString();
      return {
        code: 200,
        message: '获取成功',
        title: '少数派',
        subtitle: '最热',
        total: newData.length,
        updateTime: this.updateTime,
        data: newData,
      };
    } catch (error) {
      throw new Error('获取失败');
    }
  }
}
