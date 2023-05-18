import { Module } from '@nestjs/common';
import { ThePaperController } from './thepaper.controller';
import { ThePaperService } from './thepaper.service';

@Module({
  controllers: [ThePaperController],
  providers: [ThePaperService],
})
export class ThepaperModule { }
