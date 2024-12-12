import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completions')
  async createCompletion(@Body() createOpenaiDto: CreateOpenaiDto) {
    // 调用服务层处理逻辑
    return this.openaiService.createCompletion(createOpenaiDto);
  }

  @Post('edits')
  async createEdit(@Body() editRequestDto: any) {
    // 处理编辑请求
    return this.openaiService.createEdit(editRequestDto);
  }

  @Post('images/generations')
  async createImage(@Body() imageRequestDto: any) {
    // 处理图像生成请求
    return this.openaiService.createImage(imageRequestDto);
  }

  @Post('moderations')
  async createModeration(@Body() moderationRequestDto: any) {
    return this.openaiService.createModeration(moderationRequestDto);
  }
}
