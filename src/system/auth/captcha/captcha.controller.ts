import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as svgCaptcha from 'svg-captcha';

@Controller('system/captcha')
@ApiTags('system')
export class CaptchaController {
  @Get()
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({ status: 200, description: '验证码获取成功' })
  @ApiResponse({ status: 500, description: '验证码获取失败' })
  getCaptcha(@Res() res: Response): void {
    const captcha: any = svgCaptcha.create();
    res.send(captcha);
  }
}
