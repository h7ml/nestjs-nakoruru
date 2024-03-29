import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
const apiPrefix = 'https://nestjs.h7ml.cn/api/hotapi/';

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
  | 'toutiao'
  | 'baidu/hot'
  | 'baidu/github'
  | 'sspai'
  | 'v2ex';

@ApiTags('github')
@Controller('/github.md')
export class GithubController {
  @ApiExcludeEndpoint()
  @Get()
  @Header('Content-Disposition', 'attachment; filename="readme.md"')
  async getFile(): Promise<string> {
    const hotList: Source[] = [
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
    ];
    const info: Record<Source, Article> = await generateHotList(hotList);
    const md = await generateReadme(info);
    return md;
  }
}

// 生成仓库列表的 Markdown 内容
async function generateHotList(
  apiServer: Source[],
): Promise<Record<Source, Article>> {
  const requests = apiServer.map((api) => axios.get(apiPrefix + api));
  const responses = await Promise.all(requests);

  const results: Record<Source, Article> = {} as Record<Source, Article>;

  responses.forEach((response, index) => {
    const key = apiServer[index];
    const responseData = response.data.response?.data;

    results[key] =
      responseData?.trendingList ??
      responseData?.data ??
      responseData ??
      response.data.response;
  });

  return results;
}

async function generateReadme(data: any): Promise<string> {
  let readme = '';
  readme += `
  <pre>
  每一个不曾起舞的日子，都是对生命的辜负!💃
                                -- h7ml
  </pre>

  <img align='right' src="https://nakoruru.h7ml.cn/proxy/www.h7ml.cn/logo.png" width="230">

  ## About Me ℹ️

  [![前端物语](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/前端物语-4ABF8A?logo=Bloglovin&logoColor=fff)](https://www.h7ml.cn?q=github)
  [![GitHub Stars](https://nakoruru.h7ml.cn/proxy/img.shields.io/github/stars/h7ml?color=2da44e&label=GitHub%20Stars&logo=Github)](https://github.com/h7ml)
  [![visitors](https://nakoruru.h7ml.cn/proxy/visitor-badge.laobi.icu/badge?page_id=h7ml.h7ml)](https://github.com/h7ml)
  [![CodeTime](https://nakoruru.h7ml.cn/proxy/img.shields.io/endpoint?style=social&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D3645%26project%3D%26in%3D0)](https://codetime.dev/zh-CN)

  ## Design 🎨
  ![Sketch](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Sketch-F7B500?logo=Sketch&logoColor=333)
  ![Figma](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=fff)
  ![Blender](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Blender-F5792A?logo=Blender&logoColor=fff)
  ![Stable Diffsion](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-🤗_Stable_Diffusion-000?style=flat-square&color=9a61c3)

  ## Languages 🌐

  ![HTML5](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=fff)
  ![CSS3](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=fff)
  ![JavaScript](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=333)
  ![TypeScript](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=fff)

  ## Frameworks and Tools: 🛠️

  ![React](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/React-61DAFB?logo=React&logoColor=333)
  ![Next.js](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=a84825)
  ![Vue.js](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Vue.js-4FC08D?logo=Vue.js&logoColor=fff)
  ![Sass](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Sass-CC6699?logo=Sass&logoColor=fff)
  ![Tailwind CSS](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=TailwindCSS&logoColor=fff)
  ![Git](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Git-F05032?logo=Git&logoColor=fff)
  ![Visual Studio Code](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/VS%20CODE-007ACC?logo=VisualStudioCode&logoColor=fff)
  ![Zustand](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-🐻_Zustand-000?style=flat-square&color=b261ea)
  ![Ant Design](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-Ant_Design-000?style=flat-square&logoColor=white&logo=ant-design&color=9a05da)
  ![Umi](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-UMI-000?style=flat-square&logo=umami&color=f8c2dc)
  ![Electron](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-Electron-000?style=flat-square&logoColor=white&logo=electron&color=77915e)
  ![Three.js](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-Three.js-000?style=flat-square&logoColor=white&logo=three.js&color=7f28be)
  ![Webgl](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/-Webgl-000?style=flat-square&logoColor=white&logo=webgl&color=9a05da)

  ## Backend: 🚀
  ![Node.js](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=fff)
  ![Mysql](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Mysql-4479A1?logo=Mysql&logoColor=fff)
  ![MongoDB](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/MongoDB-47A248?logo=MongoDB&logoColor=fff)
  ![Nginx](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Nginx-269539?logo=Nginx&logoColor=fff)
  ![Egg.js](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Egg.js-F7B500?logo=Egg.js&logoColor=333)

  ## Devops: 📦
  ![Docker](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Docker-2496ED?logo=Docker&logoColor=fff)
  ![K8s](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/K8s-326CE5?logo=Kubernetes&logoColor=fff)
  ![Jetkins](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Jetkins-D24939?logo=Jenkins&logoColor=fff)
  ![Github Actions](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Github%20Actions-2088FF?logo=Github%20Actions&logoColor=fff)
  ![Semantic Release](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Semantic%20Release-000?style=flat-square&logoColor=white&logo=semantic-release&color=89364a)
  ![Gitmoji Commit Workflow](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Gitmoji%20Commit%20Workflow-000?style=flat-square&logoColor=white&logo=git&color=1efeee)
  ![Vercel](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Vercel-000?style=flat-square&logoColor=white&logo=vercel&color=3516fc)
  ![Prettiter](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Prettiter-000?style=flat-square&logoColor=white&logo=prettier&color=4aaeec)
  ![ESLint](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/ESLint-000?style=flat-square&logoColor=white&logo=eslint&color=bc9e4b)
  ![Stylelint](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Stylelint-000?style=flat-square&logoColor=white&logo=stylelint&color=00d33e)
  ![Commitlint](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Commitlint-000?style=flat-square&logoColor=white&logo=commitlint&color=ff03d2)
  ![Husky](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Husky-000?style=flat-square&logoColor=white&logo=husky&color=fd3573)
  ![Conventional Changelog](https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/Conventional%20Changelog-000?style=flat-square&logoColor=white&logo=conventional-changelog&color=d6210f)


  ## GitHub Stats 📊

  ![h7ml's github stats](https://nakoruru.h7ml.cn/proxy/github-readme-stats.vercel.app/api?username=h7ml&show_icons=true&hide_title=true&count_private=true)
  ![Top Langs](https://nakoruru.h7ml.cn/proxy/github-readme-stats.vercel.app/api/top-langs/?username=h7ml&layout=compact)

  ## CodeTime: ⏱️

  <img align='center' alt="wakatime" title="wakatime" src="https://nakoruru.h7ml.cn/proxy/wakatime.com/share/@78c90c00-b60a-4b53-aca3-cdaada528717/e2a927a0-e579-4e6e-98cb-d769bbc3de2c.png">
  `;

  readme += '\n\n';
  readme += '## [hotapi](https://nestjs.h7ml.cn/#/hotapi?q=github) 🔥\n\n';
  for (const source in data) {
    const articles = data[source];
    // readme += `${source}🔍\n`;
    readme += `<details>\n`;
    readme += `<summary> tag: ${source} 🔍 server: <a href="${apiPrefix}${source}?q=github" target="_blank">${apiPrefix}${source}</a>
    </summary>\n`;
    // readme += `<ol>\n`;
    articles.forEach((article, index) => {
      // readme += `<li>\n`;
      readme += `\n ${index + 1} [${article.title}](${article.url})\n`;
      // readme += `</li>\n`;
    });
    // readme += `</ol>\n`;
    readme += `</details>\n\n`;
    readme += `\n`;
  }

  readme += `## Metrics and Statistics 📈

  <img align='center' alt="Metrics" title="Metrics" src="https://nakoruru.h7ml.cn/proxy/metrics.lecoq.io/h7ml?template=classic&stars=1&people=1&repositories=1&starlists=1&achievements=1&notable=1&rss=1&steam=1&16personalities=1&base=header%2C%20activity%2C%20community%2C%20repositories%2C%20metadata&base.indepth=false&base.hireable=false&base.skip=false&repositories.batch=100&repositories.forks=false&repositories.affiliations=owner&stars=false&stars.limit=4&people=false&people.limit=24&people.identicons=true&people.identicons.hide=false&people.size=28&people.types=followers%2C%20following&people.shuffle=true&repositories=false&repositories.pinned=0&repositories.starred=0&repositories.random=0&repositories.order=featured%2C%20pinned%2C%20starred%2C%20random&starlists=false&starlists.limit=2&starlists.limit.repositories=2&starlists.languages=false&starlists.limit.languages=8&starlists.shuffle.repositories=true&achievements=false&achievements.threshold=C&achievements.secrets=true&achievements.display=detailed&achievements.limit=0&notable=false&notable.from=organization&notable.repositories=false&notable.indepth=false&notable.types=commit&notable.self=false&rss=false&rss.source=https%3A%2F%2Fwww.h7ml.cn%2Fsitemap.xml&rss.limit=4&steam=false&steam.sections=player%2C%20most-played%2C%20recently-played&steam.user=undefined&steam.games.limit=1&steam.recent.games.limit=1&steam.achievements.limit=2&steam.playtime.threshold=2&16personalities=false&16personalities.url=https%3A%2F%2Fwww.h7ml.cn&16personalities.sections=personality&16personalities.scores=true&config.timezone=Asia%2FShanghai&config.twemoji=true&config.octicon=true&config.display=columns">

  ##### This Readme.md file is generated by [nestjs-nakoruru](https://github.com/h7ml/nestjs-nakoruru), with the domain [https://nestjs.h7ml.cn](https://nestjs.h7ml.cn) and authored by h7ml.
  `;

  return readme;
}
