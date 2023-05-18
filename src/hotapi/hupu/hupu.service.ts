import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class HuPuService {
  async getHuPu() {
    const url = 'https://bbs.hupu.com/all-gambia';
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36',
        'Upgrade-Insecure-Requests': '1',
        Referer: 'https://bbs.hupu.com/',
        Host: 'bbs.hupu.com',
      },
      timeout: 10000,
    });
    const $ = cheerio.load(response.data);
    const allData = [];
    $('.text-list-model .list-item-wrap .list-wrap .list-item .t-info a').each(
      (index, element) => {
        const s = $(element);
        const url = s.attr('href');
        const text = s.text();
        allData.push({ title: text, url: `https://bbs.hupu.com/${url}` });
      },
    );
    return allData;
  }
}
