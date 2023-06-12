/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-05-16 13:04:34
 * @lastModified  2023-05-16 13:04:37
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-05-16 13:04:34
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-06-12 23:12:36
 * @FilePath: \nestjs-nakoruru\src\hotapi\thepaper\thepaper.service.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface ThePaperResponse {
  data: {
    hotNews: any[];
  };
}

@Injectable()
export class ThePaperService {
  private readonly url =
    'https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar';
  private updateTime: string;

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.contId,
        title: v.name,
        pic: v.pic,
        hot: v.praiseTimes,
        time: v.pubTime,
        url: `https://www.thepaper.cn/newsDetail_forward_${v.contId}`,
        mobileUrl: `https://m.thepaper.cn/newsDetail_forward_${v.contId}`,
      };
    });
  }

  async getThePaper() {
    const response = await axios.get<ThePaperResponse>(this.url);
    const data = this.getData(response.data.data.hotNews);
    this.updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '澎湃新闻',
      subtitle: '热榜',
      total: data.length,
      updateTime: this.updateTime,
      data,
    };
  }

  async getNewThePaper() {
    const response = await axios.get<ThePaperResponse>(this.url);
    const newData = this.getData(response.data.data.hotNews);
    this.updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '澎湃新闻',
      subtitle: '热榜',
      total: newData.length,
      updateTime: this.updateTime,
      data: newData,
    };
  }
}
