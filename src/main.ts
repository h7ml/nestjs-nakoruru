import { NestFactory } from '@nestjs/core';
import { fastifyMultipart } from 'fastify-multipart';

import { generateDocument } from './swagger/swagger';
import { AppModule } from './app.module';
import { ConfigEnum } from './common/enum/config.enum';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
declare const module: any;

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册 fastify-multipart 插件
  app.register(fastifyMultipart);

  // 接口版本化管理
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api');

  generateDocument(app);
  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const configService = app.get(ConfigService);
  const serverValue = configService.get(ConfigEnum.SERVER_VALUE);
  await app.listen(serverValue.port, serverValue.host);
}
bootstrap().then(() => {
  console.log(`server is running: http://localhost:8000`);
});
