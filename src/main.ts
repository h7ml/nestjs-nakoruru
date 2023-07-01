import { NestFactory } from '@nestjs/core';
import { generateDocument } from './swagger/swagger';
import { AppModule } from './app.module';
import { ConfigEnum } from './common/enum/config.enum';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import open_url_by_browser from 'open-url-by-browser';

import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
declare const module: any;

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getEnv } from './config/configuration';
async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 接口版本化管理
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api');
  // const cssFilePath = join(__dirname, '.', 'src', 'public');
  // app.useStaticAssets({
  //   root: cssFilePath,
  //   prefix: '/',
  // });
  generateDocument(app);
  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const configService = app.get(ConfigService);
  const serverValue = configService.get(ConfigEnum.SERVER_VALUE);
  await app.listen(serverValue.port, serverValue.host);
  const environment = getEnv() ?? 'dev';
  // if (environment === 'dev')
  //   open_url_by_browser(
  //     `http://${serverValue.host}:${serverValue.port}`,
  //     'chrome',
  //   );
}
bootstrap().then(() => {
  console.log(`server is running: http://localhost:8000`);
});
