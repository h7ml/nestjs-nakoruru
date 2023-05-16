/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-05-16 10:25:50
 * @lastModified  2023-05-16 10:26:52
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-05-16 10:25:50
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-05-16 10:26:52
 * @FilePath: \nestjs-nakoruru\src\tieba\tieba.service.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface TiebaResponse {
  data: {
    bang_topic: {
      topic_list: any[];
    };
  };
}

@Injectable()
export class TiebaService {
  private readonly url = 'https://tieba.baidu.com/hottopic/browse/topicList';

  private getData(data): any[] {
    if (!data) return [];
    return data.map((v) => {
      return {
        id: v.topic_id,
        title: v.topic_name,
        desc: v.topic_desc,
        pic: v.topic_pic,
        hot: v.discuss_num,
        url: v.topic_url,
        mobileUrl: v.topic_url,
      };
    });
  }

  async getTiebaData() {
    const response = await axios.get(this.url);
    const json = response.data as TiebaResponse;
    const data = this.getData(json.data.bang_topic.topic_list);
    const updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '百度贴吧',
      subtitle: '热议榜',
      total: data.length,
      updateTime,
      data,
    };
  }

  async getNewTiebaData() {
    const response = await axios.get(this.url);
    const json = response.data as TiebaResponse;
    const newData = this.getData(json.data.bang_topic.topic_list);
    const updateTime = new Date().toISOString();
    return {
      code: 200,
      message: '获取成功',
      title: '百度贴吧',
      subtitle: '热议榜',
      total: newData.length,
      updateTime,
      data: newData,
    };
  }
}
