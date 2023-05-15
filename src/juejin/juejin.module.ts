import { Module } from '@nestjs/common';
import { JuejinController } from './juejin.controller';

@Module({
  controllers: [JuejinController]
})
export class JuejinModule {}
