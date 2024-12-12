import { ApiProperty } from '@nestjs/swagger';

export class CreateOpenaiDto {
  @ApiProperty({
    description: '模型名称',
    default: 'gpt-3.5-turbo', // 设置默认值
  })
  model: string;

  @ApiProperty({
    description: '消息数组',
    default: [
      {
        role: 'user',
        content: 'Hello!',
      },
    ], // 设置默认值
  })
  messages: { role: string; content: string }[];

  constructor() {
    this.model = 'gpt-3.5-turbo'; // 设置默认模型
    this.messages = [{ role: 'user', content: 'Hello!' }]; // 设置默认消息
  }
}
