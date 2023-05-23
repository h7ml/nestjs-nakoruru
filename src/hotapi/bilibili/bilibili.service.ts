import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

export interface BilibiliData {
  id: string;
  title: string;
  desc: string;
  pic: string;
  owner: any; // 这里我不确定owner的类型，所以暂时用any
  data: any; // 这里我也不确定data的类型，所以暂时用any
  hot: number;
  url: string;
  mobileUrl: string;
}

interface BilibiliResponseData {
  bvid: string;
  title: string;
  desc: string;
  pic: string;
  owner: any;
  stat: any;
  short_link_v2: string;
}

interface BilibiliResponse {
  data: {
    list: BilibiliResponseData[];
  };
}

@Injectable()
export class BilibiliService {
  private readonly url = 'https://api.bilibili.com/x/web-interface/ranking/v2';

  async getBilibili() {
    try {
      const response: AxiosResponse<BilibiliResponse> = await axios.get(
        this.url,
      );
      const { data } = response.data;
      return {
        code: 200,
        message: '获取成功',
        title: '哔哩哔哩',
        subtitle: '热门榜',
        total: data.list.length,
        updateTime: new Date().toISOString(),
        data: this.processData(data.list),
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

  private processData(data: BilibiliResponseData[]): BilibiliData[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.bvid,
        title: v.title,
        desc: v.desc,
        pic: v.pic.replace(/http:/, 'https:'),
        owner: v.owner,
        data: v.stat,
        hot: v.stat.view,
        url: v.short_link_v2 || `https://b23.tv/${v.bvid}`,
        mobileUrl: `https://m.bilibili.com/video/${v.bvid}`,
      };
    });
  }
}
