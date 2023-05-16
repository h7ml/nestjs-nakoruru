import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZhihuService {
  private cacheKey = 'zhihuData';
  private url = 'https://www.zhihu.com/hot';
  private headers = {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
  };
  private cache = new Map<string, any>();

  async getZhihuHot() {
    let data = this.cache.get(this.cacheKey);
    if (!data) {
      const response = await axios.get(this.url, { headers: this.headers });
      data = this.getData(response.data);
      if (data === false) {
        throw new Error('数据处理出错');
      }
      this.cache.set(this.cacheKey, data);
    }
    return {
      code: 200,
      message: '获取成功',
      title: '知乎',
      subtitle: '热榜',
      total: data.length,
      data,
    };
  }

  async getZhihuHotNew() {
    const response = await axios.get(this.url, { headers: this.headers });
    const newData = this.getData(response.data);
    if (newData === false) {
      throw new Error('数据处理出错');
    }
    this.cache.set(this.cacheKey, newData);
    return {
      code: 200,
      message: '获取成功',
      title: '知乎',
      subtitle: '热榜',
      total: newData.length,
      data: newData,
    };
  }

  private getData(data) {
    if (!data) return [];
    const dataList = [];
    try {
      const pattern =
        /<script id="js-initialData" type="text\/json">(.*?)<\/script>/;
      const matchResult = data.match(pattern);
      const jsonObject = JSON.parse(matchResult[1]).initialState.topstory
        .hotList;
      jsonObject.forEach((v) => {
        dataList.push({
          title: v.target.titleArea.text,
          desc: v.target.excerptArea.text,
          pic: v.target.imageArea.url,
          hot:
            parseInt(v.target.metricsArea.text.replace(/[^\d]/g, '')) * 10000,
          url: v.target.link.url,
          mobileUrl: v.target.link.url,
        });
      });
      return dataList;
    } catch (error) {
      console.error('数据处理出错' + error);
      return false;
    }
  }
}
