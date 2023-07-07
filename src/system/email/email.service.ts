import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * 发送邮件验证码
   * @param data 邮件主体信息
   */
  async sendEmailCode(data) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = '2021年03月18日 22:27:49';
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        subject: data.subject || '用户邮箱验证',
        template: 'validate.code.ejs', //这里写你的模板名称，如果你的模板名称的单名如 validate.ejs ,直接写validate即可 系统会自动追加模板的后缀名,如果是多个，那就最好写全。
        //内容部分都是自定义的
        context: {
          code, //验证码
          date, //日期
          sign: data.sign || '系统邮件,回复无效。', //发送的签名,当然也可以不要
        },
        // attachments: [
        //     {
        //         filename: 'validate.code.ejs', //文件名
        //         path: path.join(process.cwd(), './src/email/template/validate.code.ejs') //服务端的文件地址
        //     }
        // ]
      };
      this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          console.log(
            `发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`,
          );
        })
        .catch((error) => {
          console.log(
            `发送邮件给:${data.email}出错!主题:${data.subject || '默认'}`,
            error,
          );
        });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }
}
