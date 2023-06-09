import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  async getGithubData() {
    const url =
      'https://kaifa.baidu.com/rest/v1/home/github?optionLanguage=&optionSince=';

    try {
      const response = await axios.get(url);
      // 处理响应数据
      const githubData = response.data;
      return githubData;
    } catch (error) {
      // 处理错误
      throw new Error('Failed to fetch GitHub data');
    }
  }
}
