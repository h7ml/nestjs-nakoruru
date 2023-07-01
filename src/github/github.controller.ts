import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { createReadStream } from 'fs';
import axios from 'axios';

@ApiTags('github')
@Controller('/github.md')
export class GithubController {
  @Get()
  // @Header('Content-Type', 'text/markdown')
  // @Header('Content-Disposition', 'attachment; filename="readme.md"')
  async getFile(): Promise<StreamableFile> {
    const hotList = [
      'juejin',
      '36kr',
      'baidu',
      'baidu/hot',
      'baidu/github',
      'bilibili',
      'zhihu',
      'tieba',
      'thepaper',
      'weibo',
      'newsqq',
      'toutiao',
      'sspai',
      'v2ex',
      'douban',
    ];
    const info = await generateHotList(hotList);

    console.log(
      '%c [ info ]-15',
      'font-size:13px; background:pink; color:#bf2c9f;',
      info,
    );
    const readmeTemplatePath = join(__dirname, '.', 'README.md.template');
    console.log(
      '%c [ readmeTemplatePath ]-39',
      'font-size:13px; background:pink; color:#bf2c9f;',
      readmeTemplatePath,
    );

    const file = createReadStream(readmeTemplatePath);
    return new StreamableFile(file);
  }
}

// 生成仓库列表的 Markdown 内容
async function generateHotList(apiServer: any[]): Promise<any[]> {
  const apiHost = 'https://nest.h7ml.cn/api/hotapi/';

  // 使用axios promise.all 并发请求 拼接
  const requests = apiServer.map((api) => axios.get(apiHost + api));
  const responses = await Promise.all(requests);
  const results = responses.map((response) => response.data.response);
  return results;
}
