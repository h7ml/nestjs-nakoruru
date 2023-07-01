import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { createReadStream } from 'fs';
import axios from 'axios';

interface Article {
  id?: string | number;
  title: string;
  desc?: string;
  pic?: string;
  owner?: string | Owner;
  hot: number;
  data?: Data;
  url: string;
  mobileUrl: string;
}

interface Owner {
  mid: number;
  name: string;
  face: string;
}

interface Data {
  itemId?: number;
  templateType?: number;
  widgetImage?: string;
  publishTime?: number | string;
  widgetTitle?: string;
  authorName?: string;
  statRead?: number;
  statCollect?: number;
  statComment?: number;
  statPraise?: number;
  statFormat?: string;
  aid?: number;
  view?: number;
  danmaku?: number;
  reply?: number;
  favorite?: number;
  coin?: number;
  share?: number;
  now_rank?: number;
  his_rank?: number;
  like?: number;
  dislike?: number;
  vt?: number;
  vv?: number;
}

type Source =
  | 'juejin'
  | '36kr'
  | 'baidu'
  | 'bilibili'
  | 'zhihu'
  | 'tieba'
  | 'weibo'
  | 'newsqq'
  | 'toutiao';

@ApiTags('github')
@Controller('/github.md')
export class GithubController {
  @ApiExcludeEndpoint()
  @Get()
  @Header('Content-Disposition', 'attachment; filename="readme.md"')
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
      'weibo',
      'newsqq',
      'toutiao',
      'sspai',
      'v2ex',
      'douban',
    ];
    const info: Record<Source, Article> = await generateHotList(hotList);
    const md = await generateReadme(info);
    await sendData('readme.md', md);
    const file = createReadStream(
      join(process.cwd(), 'write-file', 'readme.md'),
    );

    return new StreamableFile(file);
  }
}

// 生成仓库列表的 Markdown 内容
async function generateHotList(
  apiServer: string[],
): Promise<Record<Source, Article>> {
  const apiHost = 'https://nest.h7ml.cn/api/hotapi/';

  const requests = apiServer.map((api) => axios.get(apiHost + api));
  const responses = await Promise.all(requests);

  const results: Record<Source, Article> | object = {}; // 修改对象类型声明

  responses.forEach((response, index) => {
    const key = apiServer[index];
    results[key] =
      response.data.response?.data?.trendingList ??
      response.data.response?.data?.data ??
      response.data.response?.data ??
      response.data.response;
  });

  return results as Record<Source, Article>; // 断言类型为 Record<Source, Article>
}

async function generateReadme(data: any): Promise<string> {
  let readme = '';

  readme +=
    '<pre>\n' +
    '每一个不曾起舞的日子,都是对生命的辜负!\n' +
    '                              -- h7ml\n' +
    '</pre>\n' +
    '\n' +
    '<img align=\'right\' src="https://www.h7ml.cn/logo.png" width="230">\n' +
    '\n' +
    '**About Me:**\n' +
    '\n' +
    '[![前端物语](https://img.shields.io/badge/前端物语-4ABF8A?logo=Bloglovin&logoColor=fff)](https://www.h7ml.cn?q=github)\n' +
    '[![GitHub Stars](https://img.shields.io/github/stars/h7ml?color=2da44e&label=GitHub%20Stars&logo=Github)](https://github.com/h7ml)\n' +
    '[![visitors](https://visitor-badge.laobi.icu/badge?page_id=h7ml.h7ml)](https://github.com/h7ml)\n' +
    '\n' +
    '**Languages:**\n' +
    '\n' +
    '![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=fff)\n' +
    '![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=fff)\n' +
    '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=333)\n' +
    '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=fff)\n' +
    '\n' +
    '**Frameworks and Tools:**\n' +
    '\n' +
    '![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=333)\n' +
    '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=fff)\n' +
    '![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=Vue.js&logoColor=fff)\n' +
    '![Sass](https://img.shields.io/badge/Sass-CC6699?logo=Sass&logoColor=fff)\n' +
    '![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=TailwindCSS&logoColor=fff)\n' +
    '![Git](https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=fff)\n' +
    '![Visual Studio Code](https://img.shields.io/badge/VS%20CODE-007ACC?logo=VisualStudioCode&logoColor=fff)\n' +
    '\n' +
    '**GitHub Stats:**\n' +
    '\n' +
    "![h7ml's github stats](https://github-readme-stats.vercel.app/api?username=h7ml&show_icons=true&hide_title=true&count_private=true)" +
    '\n' +
    '![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=h7ml&layout=compact)\n' +
    '\n' +
    '**CodeTime::**\n' +
    '\n' +
    '![wakatime](https://wakatime.com/share/@78c90c00-b60a-4b53-aca3-cdaada528717/e2a927a0-e579-4e6e-98cb-d769bbc3de2c.png)' +
    '\n' +
    '![CodeTime](https://img.shields.io/endpoint?style=social&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D3645%26project%3D%26in%3D0)';

  readme += '# 全网热搜\n\n';
  for (const source in data) {
    const articles = data[source];

    readme += `## ${source}\n\n`;
    readme += `<details>\n`;
    readme += `<summary>${source}</summary>\n\n`;

    // readme += `<ol>\n`;
    articles.forEach((article, index) => {
      // readme += `<li>\n`;
      readme += `${index} -[${article.title}](${article.url})\n`;
      // readme += `</li>\n`;
    });
    // readme += `</ol>\n`;

    readme += `</details>\n\n`;
  }
  readme += `![Metrics](https://metrics.lecoq.io/h7ml?template=classic&base.repositories=0&isocalendar=1&languages=1&followup=1&people=1&code=1&notable=1&discussions=1&lines=1&repositories=1&introduction=1&gists=1&tweets=1&base.indepth=false&base.hireable=false&repositories=100&repositories.batch=100&repositories.forks=false&repositories.affiliations=owner&isocalendar.duration=half-year&languages.limit=8&languages.threshold=0%25&languages.other=false&languages.colors=github&languages.sections=most-used&languages.indepth=false&languages.analysis.timeout=15&languages.categories=markup%2C%20programming&languages.recent.categories=markup%2C%20programming&languages.recent.load=300&languages.recent.days=14&followup.sections=repositories&followup.indepth=false&followup.archived=true&people.limit=24&people.identicons=false&people.identicons.hide=false&people.size=28&people.types=followers%2C%20following&people.shuffle=false&code.lines=12&code.load=400&code.days=3&code.visibility=public&notable.from=organization&notable.repositories=false&notable.indepth=false&notable.types=commit&discussions.categories=true&discussions.categories.limit=0&repositories.pinned=0&introduction.title=true&tweets.user=.user.twitter&tweets.attachments=false&tweets.limit=2&config.timezone=Asia%2FShanghai)
\n`;

  return readme;
}

const sendData = async (filename, content) => {
  const url = 'https://nestjs.h7ml.cn/api/write-file/' + filename;
  const data = JSON.stringify(content);

  await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
