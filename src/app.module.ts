import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { V2exModule } from './hotapi/v2ex/v2ex.module';
import { DoubanModule } from './hotapi/douban/douban.module';
import { HupuModule } from './hotapi/hupu/hupu.module';
import { TypeOrmConfig } from './config';
const dynamicModules = [
  'system/user/user.module',
  'system/menu/menu.module',
  'hotapi/juejin/juejin.module',
  'hotapi/kr36/kr36.module',
  'hotapi/baidu/baidu.module',
  'hotapi/bilibili/bilibili.module',
  'hotapi/zhihu/zhihu.module',
  'hotapi/tieba/tieba.module',
  'hotapi/thepaper/thepaper.module',
  'hotapi/weibo/weibo.module',
  'hotapi/newsqq/newsqq.module',
  'hotapi/toutiao/toutiao.module',
  'hotapi/sspai/sspai.module',
].map((modulePath) => {
  return import(`./${modulePath}`).then(
    (module) => module[Object.keys(module)[0]],
  );
});

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TypeOrmConfig }),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/pages/home/'),
      exclude: ['/api*'],
    }),
    ...dynamicModules,
    V2exModule,
    DoubanModule,
    HupuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
