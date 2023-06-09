import { Module } from '@nestjs/common';
import { BaiduController } from './baidu.controller';
import { HotModule } from './hot/hot.module';
import { GithubModule } from './github/github.module';

@Module({
  controllers: [BaiduController],
  imports: [HotModule, GithubModule],
})
export class BaiduModule {}
