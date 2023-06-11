import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document, {
    customCssUrl: '/css/theme-outline.css',
  });
};
