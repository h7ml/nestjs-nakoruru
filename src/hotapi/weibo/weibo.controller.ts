import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeiboService } from './weibo.service';

@ApiTags('微博')
@Controller('hotapi/weibo')
export class WeiboController {
  constructor(private readonly weiboService: WeiboService) {}

  @Get('/weibo')
  @ApiOperation({ summary: '获取微博热搜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getWeibo() {
    try {
      return await this.weiboService.getWeibo();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/weibo/new')
  @ApiOperation({ summary: '获取微博热搜 - 最新数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getNewWeibo() {
    try {
      return await this.weiboService.getNewWeibo();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
