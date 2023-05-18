import { Controller, Get } from '@nestjs/common';
import { HuPuService } from './hupu.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('hupu')
@Controller('iotapi/hupu')
export class HupuController {
  constructor(private readonly hupuService: HuPuService) {}

  @Get()
  @ApiOperation({ summary: '获取虎扑热门话题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async getHuPu() {
    const data = await this.hupuService.getHuPu();
    return { count: data.length, data };
  }
}
