import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('system/files')
@ApiTags('system')
export class FileController {
  @Post('upload')
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传文件和其他字段',
    type: CreateFileDto,
  })
  @ApiResponse({ status: 201, description: '文件上传成功' })
  @ApiResponse({ status: 500, description: '文件上传失败' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    files: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ): Promise<any> {
    // 在这里处理文件上传逻辑，可以使用 file 对象访问上传的文件信息，使用 body 对象访问其他表单字段
    console.log(files);
    // 返回适当的响应
    return { message: '文件上传成功' };
  }
}
