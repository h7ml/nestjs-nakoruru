import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsqqService {
  private url = 'https://r.inews.qq.com/gw/event/hot_ranking_list?page_size=50';

  private getData(data: any[]) {
    if (!data) return [];
    return data.slice(1).map((v) => {
      return {
        id: v.id,
        title: v.title,
        desc: v.abstract,
        descSm: v.nlpAbstract,
        hot: v.readCount,
        pic: v.miniProShareImage,
        url: `https://new.qq.com/rain/a/${v.id}`,
        mobileUrl: `https://view.inews.qq.com/a/${v.id}`,
      };
    });
  }

  async getNewsqq(): Promise<any> {
    try {
      const response = await axios.get(this.url);
      const data = this.getData(response.data.idlist[0].newslist);

      return {
        code: 200,
        message: '获取成功',
        title: '腾讯新闻',
        subtitle: '热点榜',
        total: data.length,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        title: '腾讯新闻',
        subtitle: '热点榜',
        message: '获取失败',
      };
    }
  }
}
