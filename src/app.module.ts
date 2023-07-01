import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER } from '@nestjs/core';
import { join } from 'path';
import { V2exModule } from './hotapi/v2ex/v2ex.module';
import { DoubanModule } from './hotapi/douban/douban.module';
import { HupuModule } from './hotapi/hupu/hupu.module';
import { TypeOrmConfig } from './config';
import { OrderModule } from './order/order.module';
import { UserModule } from './system/user/user.module';
import { MenuModule } from './system/menu/menu.module';
import { JuejinModule } from './hotapi/juejin/juejin.module';
import { Kr36Module } from './hotapi/kr36/kr36.module';
import { BaiduModule } from './hotapi/baidu/baidu.module';
import { BilibiliModule } from './hotapi/bilibili/bilibili.module';
import { ZhihuModule } from './hotapi/zhihu/zhihu.module';
import { TiebaModule } from './hotapi/tieba/tieba.module';
import { ThepaperModule } from './hotapi/thepaper/thepaper.module';
import { WeiboModule } from './hotapi/weibo/weibo.module';
import { NewsqqModule } from './hotapi/newsqq/newsqq.module';
import { ToutiaoModule } from './hotapi/toutiao/toutiao.module';
import { SspaiModule } from './hotapi/sspai/sspai.module';
import { ReactFlowModule } from './react-flow/react-flow.module';
import { LogsConfigModule } from './common/logs-config/logs-config.module';
import { getConfig } from './config/configuration';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { SwaggerModule } from './swagger/swagger.module';
import { GithubModule } from './github/github.module';

const environment = process.env.RUNNING_ENV === 'dev';
const rootpath = environment
  ? join(__dirname, '..', 'src', 'public')
  : '/public/';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: rootpath, // 静态文件所在的根目录路径
      serveRoot: '/static', // 静态文件的路由前缀
    }),
    TypeOrmModule.forRoot({ ...TypeOrmConfig }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    environment ? LogsConfigModule : null,
    UserModule,
    MenuModule,
    JuejinModule,
    Kr36Module,
    BaiduModule,
    BilibiliModule,
    ZhihuModule,
    TiebaModule,
    ThepaperModule,
    WeiboModule,
    NewsqqModule,
    ToutiaoModule,
    SspaiModule,
    V2exModule,
    DoubanModule,
    HupuModule,
    OrderModule,
    ReactFlowModule,
    SwaggerModule,
    GithubModule,
  ],
  controllers: [],
  providers: environment
    ? [
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
        },
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
      ]
    : [],
})
export class AppModule {}
