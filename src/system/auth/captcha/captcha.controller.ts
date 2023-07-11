import { Controller, Get, Header, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as svgCaptcha from 'svg-captcha';

@Controller('system/captcha')
@ApiTags('system')
export class CaptchaController {
  @Get()
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({ status: 200, description: '验证码获取成功' })
  @ApiResponse({ status: 500, description: '验证码获取失败' })
  getCaptcha(@Res() res: any): void {
    const captcha: any = svgCaptcha.create({ background: 'rgba(0,0,0,0)' }); // 设置透明背景以便于转换为 PNG

    res.type('svg');
    res.header('Captcha-Text', captcha.text);
    res.send(captcha.data);
  }
}

// web端解析方法
// function svgToPng(svgData, callback) {
//   const img = new Image();
//   img.onload = function () {
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0);
//     const pngData = canvas.toDataURL('image/png');
//     callback(pngData);
//   };
//   img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
// }

// // 获取验证码
// fetch('/system/captcha')
//   .then((response) => {
//     const captchaText = atob(response.headers.get('Captcha-Text'));
//     return response.text();
//   })
//   .then((svgData) => {
// svgToPng(svgData, (pngData) => {
//   // 使用转换后的 PNG 图像数据
//   const imgElement = document.getElementById('captcha-image');
//   imgElement.src = pngData;
// });
//   });
