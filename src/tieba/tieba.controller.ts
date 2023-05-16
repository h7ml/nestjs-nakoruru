import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { TiebaService } from './tieba.service';

@Controller('tieba')
export class TiebaController {
  constructor(private readonly tiebaService: TiebaService) { }

  @Get()
  async getTieba() {
    try {
      return await this.tiebaService.getTiebaData();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new')
  async getNewTieba() {
    try {
      return await this.tiebaService.getNewTiebaData();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
