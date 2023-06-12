/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-05-16 13:09:07
 * @lastModified  2023-05-16 13:09:14
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-05-16 13:09:07
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-05-16 13:09:08
 * @FilePath: \nestjs-nakoruru\src\weibo\weibo.service.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface WeiboResponse {
  data: {
    realtime: any[];
  };
}

@Injectable()
export class WeiboService {
  private readonly url = 'https://weibo.com/ajax/side/hotSearch';
  private readonly cacheKey = 'weiboData';
  private updateTime: string;

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      const key = v.word_scheme ? v.word_scheme : `#${v.word}`;
      return {
        title: v.word,
        desc: key,
        hot: v.raw_hot,
        url: `https://s.weibo.com/weibo?q=${encodeURIComponent(
          key,
        )}&t=31&band_rank=1&Refer=top`,
        mobileUrl: `https://s.weibo.com/weibo?q=${encodeURIComponent(
          key,
        )}&t=31&band_rank=1&Refer=top`,
      };
    });
  }

  async getWeibo() {
    const response = await axios.get<WeiboResponse>(this.url);
    const data = this.getData(response.data.data.realtime);
    this.updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '微博',
      subtitle: '热搜榜',
      total: data.length,
      updateTime: this.updateTime,
      data,
    };
  }

  async getNewWeibo() {
    const response = await axios.get<WeiboResponse>(this.url);
    const newData = this.getData(response.data.data.realtime);
    this.updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '微博',
      subtitle: '热搜榜',
      total: newData.length,
      updateTime: this.updateTime,
      data: newData,
    };
  }
}
