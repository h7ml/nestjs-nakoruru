import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateOpenaiDto } from './dto/create-openai.dto';

@Injectable()
export class OpenaiService {
  async createCompletion(createOpenaiDto: CreateOpenaiDto) {
    const apiKey = await this.getDefaultApiKey();
    const config = {
      method: 'post',
      url: 'https://api.302.ai/v1/chat/completions',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: createOpenaiDto,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error('请求失败');
    }
  }

  async createEdit(editRequestDto: any) {
    const apiKey = await this.getDefaultApiKey();
    const config = {
      method: 'post',
      url: 'https://api.302.ai/v1/edits',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: editRequestDto,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error('请求失败');
    }
  }

  async createImage(imageRequestDto: any) {
    const apiKey = await this.getDefaultApiKey();
    const config = {
      method: 'post',
      url: 'https://api.302.ai/v1/images/generations',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: imageRequestDto,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error('请求失败');
    }
  }

  async createModeration(moderationRequestDto: any) {
    const apiKey = await this.getDefaultApiKey();
    const config = {
      method: 'post',
      url: 'https://api.302.ai/v1/moderations',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: moderationRequestDto,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error('请求失败');
    }
  }

  private async getDefaultApiKey(): Promise<string> {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://dash-api.302.ai/bot/v1/302aitool11-prompter',
        headers: {
          accept: 'application/json',
          'accept-language': 'zh-CN,zh;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });

      if (response.status === 200 && response.data) {
        const data = response.data;
        if (data.code === 0 && data.data && data.data.api_key) {
          return data.data.api_key; // 返回 API Key
        }
      }
      console.error('获取默认API Key失败: 接口返回数据格式错误');
      return ''; // 返回空字符串或处理错误
    } catch (error) {
      console.error('获取默认API Key失败:', error);
      return ''; // 返回空字符串或处理错误
    }
  }
}
