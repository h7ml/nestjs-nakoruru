import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import axios from 'axios';
import { ThePaperService } from './thepaper.service';

@Controller()
export class ThePaperController {
  constructor(private readonly thePaperService: ThePaperService) { }

  @Get('/thepaper')
  @ApiOperation({ summary: '获取澎湃热榜' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getThePaper() {
    try {
      return await this.thePaperService.getThePaper();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/thepaper/new')
  @ApiOperation({ summary: '获取澎湃热榜 - 最新数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getNewThePaper() {
    try {
      return await this.thePaperService.getNewThePaper();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
