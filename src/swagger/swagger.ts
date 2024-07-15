import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
const environment = process.env.RUNNING_ENV === 'dev';
const swaggerPath = environment
  ? join(__dirname, '../../src/', 'public', 'swagger.json')
  : join(__dirname, '../', 'public', 'swagger.json');

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
  const writeswagger = process.env.WRITE_SWAGGER;
  const document = SwaggerModule.createDocument(app, options);
  if (writeswagger) {
    // writeFileSync(swaggerPath, JSON.stringify(document, null, 2));
    console.log(`write swagger.json to ${swaggerPath}`);
  }
  SwaggerModule.setup('/', app, document, {
    customfavIcon: 'https://nakoruru.h7ml.cn/proxy/www.h7ml.cn/logo.png',
    customJs: [
      'https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui-bundle.min.js',
      'https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui-standalone-preset.min.js',
      'https://nakoruru.h7ml.cn/proxy/nestjs.h7ml.cn/static/javascript/51.js',
      'https://sdk.51.la/event/js-sdk-event.min.js?u=K6z46J5BfIx9pBrV',
    ],
    customCssUrl: [
      'https://nakoruru.h7ml.cn/proxy/cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui.min.css',
      'https://nakoruru.h7ml.cn/proxy/nestjs.h7ml.cn/static/css/theme-outline.css',
    ],
  });
};
