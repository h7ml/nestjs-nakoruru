import { Controller, Get } from '@nestjs/common';
import { V2exService } from './v2ex.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('v2ex')
@Controller('iotapi/v2ex')
export class V2exController {
  constructor(private v2exService: V2exService) {}

  @Get()
  @ApiOperation({ summary: '获取 V2EX 热门话题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  getV2EX() {
    return this.v2exService.getV2EX();
  }
}
