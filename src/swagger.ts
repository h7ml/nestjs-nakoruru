import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { join, relative } from 'path';
import { getEnv } from './config/configuration';
import { SwaggerUIStandalonePreset } from 'swagger-ui-dist';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Nakoruru Backend API')
    .setDescription('The Nakoruru Backend API description by h7ml')
    .setVersion('0.0.1')
    .setTermsOfService('https://nestjs.h7ml.cn/')
    .setContact('Contact Name', 'http://github.com/h7ml', 'h7ml@qq.com')
    .setLicense(
      'Apache-2.0',
      'https://github.com/h7ml/nestjs-nakoruru/blob/master/license',
    )
    .setExternalDoc('Find out more about Nakoruru', 'https://nestjs.h7ml.cn/')
    .build();
  const environment = getEnv() ?? 'dev';
  const cssFilePath = relative(
    __dirname,
    join(__dirname, '.', 'static', 'css', 'theme-outline.css'),
  );
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/', app, document, {
    customfavIcon: 'https://nakoruru.h7ml.cn/proxy/www.h7ml.cn/logo.png',
    customJs: [
      'https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui-bundle.min.js',
      'https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: ['https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui.min.css'],
  });
};
