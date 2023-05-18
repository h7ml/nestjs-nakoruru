import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { V2exItem } from './v2ex-item.model';

@Injectable()
export class V2exService {
  async getV2EX(): Promise<V2exItem[]> {
    const url = 'https://www.v2ex.com/?tab=hot';
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36',
      },
      timeout: 50000,
    });
    const $ = cheerio.load(response.data);
    const items: V2exItem[] = [];
    $('.item_title a').each((index, element) => {
      items.push({
        title: $(element).text(),
        url: 'https://www.v2ex.com' + $(element).attr('href'),
      });
    });
    return items;
  }
}
