import { Module } from '@nestjs/common';
import { KrController } from './kr36.controller';

@Module({
  controllers: [KrController],
})
export class Kr36Module {}
