import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Mail } from './dto/mail.interface';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/sendCode')
  async sendEmailCode(@Body() data: Mail) {
    return this.emailService.sendEmailCode(data);
  }
}
