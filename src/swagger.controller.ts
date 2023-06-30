import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class SwaggerController {
  @ApiExcludeEndpoint() // 添加该装饰器来排除接口显示在 Swagger 文档中
  @Get('/swagger-json')
  async getSwaggerJson() {
    const filePath = join(__dirname, '..', 'src', 'public', 'swagger.json');
    const swaggerJson = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(swaggerJson);
  }
}
