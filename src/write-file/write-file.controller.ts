import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { join } from 'path';
import { createWriteStream } from 'fs';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('write-file')
@Controller('/write-file')
export class WriteFileController {
  @ApiExcludeEndpoint()
  @Post(':filename')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '写入文件' })
  @ApiResponse({ status: 201, description: '写入文件成功' })
  @ApiResponse({ status: 500, description: '写入文件失败' })
  async writeFile(
    @Param('filename') filename: string,
    @Body() content: string,
  ): Promise<any> {
    if (!content) content = 'Hello World!';
    const filePath = join(__dirname, filename || 'temp');
    const writeStream = createWriteStream(filePath);
    writeStream.write(content);
    writeStream.end();

    return { filePath, content };
  }
}
