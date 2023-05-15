/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-05-16 03:15:03
 * @lastModified  2023-05-16 03:15:12
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-05-16 03:15:03
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-05-16 03:15:12
 * @FilePath: \nestjs-nakoruru\src\bilibili\bilibili.service.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BilibiliService {
  private url = 'https://api.bilibili.com/x/web-interface/ranking/v2';

  private getData(data: any): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.bvid,
        title: v.title,
        desc: v.desc,
        pic: v.pic.replace(/http:/, 'https:'),
        owner: v.owner,
        data: v.stat,
        hot: v.stat.view,
        url: v.short_link_v2 || `https://b23.tv/${v.bvid}`,
        mobileUrl: `https://m.bilibili.com/video/${v.bvid}`,
      };
    });
  }

  async getHotList(): Promise<any[]> {
    try {
      const response = await axios.get(this.url);
      return this.getData(response.data.data.list);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
