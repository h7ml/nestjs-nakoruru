import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HotService {
  async getHotNews(pageNum = 1, pageSize = 10) {
    const url = `https://kaifa.baidu.com/rest/v1/news/hot?pageNum=${pageNum}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(url);
      // 处理响应数据
      const hotNews = response.data?.data;
      return {
        code: 200,
        data: hotNews,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        data: [],
        message: error,
      };
    }
  }
}
