import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GirlService } from './girl.service';

@ApiTags('girl')
@Controller('girl')
export class GirlController {
  // 注入Girl服务
  constructor(private readonly girlService: GirlService) { }

  @Get()
  @ApiResponse({ status: 200, description: '获取女孩信息成功' })
  @ApiResponse({ status: 500, description: '获取女孩信息失败' })
  getGirls(): any {
    try {
      // 使用服务获取女孩信息
      return this.girlService.getGirls();
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
