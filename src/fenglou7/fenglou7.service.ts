import { Injectable } from '@nestjs/common';
import { CreateFenglou7Dto } from './dto/create-fenglou7.dto';
import { UpdateFenglou7Dto } from './dto/update-fenglou7.dto';
import { ApiResponse } from './entities/fenglou7.entity';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class Fenglou7Service {
  findAll(perPage?: number, page?: number): any {
    const fileName = `7fenglou${page}.json`; // 根据页码生成文件名
    const filePath = join(
      __dirname,
      '..',
      '..',
      'src',
      'public',
      `./data/${fileName}`,
    ); // 拼接文件路径

    return new Promise<ApiResponse>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err); // 文件读取失败时，返回错误信息
        } else {
          const { Data = {} } = JSON.parse(data);
          let slicedData = Data.pageData;
          if (perPage) {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            slicedData = Data.pageData.slice(startIndex, endIndex);
          }

          const apiResponse: ApiResponse = {
            pageData: slicedData,
            currentPage: page || 1,
            perPage: perPage || 10,
            totalCount: Data.pageData.length,
            firstPageUrl: '',
            nextPageUrl: '',
            prePageUrl: '',
            pageLength: slicedData.length,
            totalPage: 0,
          };

          resolve(apiResponse); // 返回读取的 JSON 数据
        }
      });
    });
  }
}
