import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
// import { LogsConfigModule } from './common/logs-config/logs-config.module';
import { getConfig } from './config/configuration';
// import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from './common/exceptions/base.exceptions.filter';
// import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TypeOrmConfig }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    // LogsConfigModule,
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
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
