import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DoubanItem } from './douban-item.model';

@Injectable()
export class DoubanService {
  async getDouban(): Promise<{ count: number; data: DoubanItem[] }> {
    const url = 'https://www.douban.com/group/explore';
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
        'Upgrade-Insecure-Requests': '1',
        Referer: 'https://www.douban.com/group/explore',
        Host: 'www.douban.com',
      },
      timeout: 10000,
    });
    const $ = cheerio.load(response.data);
    const data: DoubanItem[] = [];
    $('.channel-item h3 a').each((index, element) => {
      data.push({
        title: $(element).text(),
        url: $(element).attr('href'),
      });
    });
    return { count: data.length, data };
  }
}
