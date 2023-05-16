import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { TiebaService } from './tieba.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tieba')
@Controller('tieba')
export class TiebaController {
  constructor(private readonly tiebaService: TiebaService) { }

  @Get()
  @ApiOperation({ summary: '获取贴吧热议榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getTieba() {
    try {
      return await this.tiebaService.getTiebaData();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new')
  @ApiOperation({ summary: '获取最新的贴吧热议榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getNewTieba() {
    try {
      return await this.tiebaService.getNewTiebaData();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
