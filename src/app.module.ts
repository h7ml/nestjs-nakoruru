import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { JuejinModule } from './juejin/juejin.module';
import { Kr36Module } from './kr36/kr36.module';
import { BaiduModule } from './baidu/baidu.module';
import { BilibiliModule } from './bilibili/bilibili.module';
import { ZhihuModule } from './zhihu/zhihu.module';
import { TiebaModule } from './tieba/tieba.module';
import { ThepaperModule } from './thepaper/thepaper.module';
import { WeiboModule } from './weibo/weibo.module';
import { SspaiModule } from './sspai/sspai.module';
import { NewsqqModule } from './newsqq/newsqq.module';
import { ToutiaoModule } from './toutiao/toutiao.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/pages/home/'),
      exclude: ['/api*'],
    }),
    GirlModule,
    JuejinModule,
    Kr36Module,
    BaiduModule,
    BilibiliModule,
    ZhihuModule,
    TiebaModule,
    ThepaperModule,
    WeiboModule,
    SspaiModule,
    NewsqqModule,
    ToutiaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
