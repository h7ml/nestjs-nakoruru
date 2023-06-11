import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  async getGithubData(optionLanguage: string, optionSince: string) {
    const encodedOptionLanguage = encodeURIComponent(optionLanguage);
    const encodedOptionSince = encodeURIComponent(optionSince);
    const url = `https://kaifa.baidu.com/rest/v1/home/github?optionLanguage=${encodedOptionLanguage}&optionSince=${encodedOptionSince}`;

    try {
      const response = await axios.get(url);
      // 处理响应数据
      const githubData = response.data?.data;
      return {
        code: 200,
        data: githubData,
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
