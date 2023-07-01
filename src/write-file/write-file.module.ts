import { Module } from '@nestjs/common';
import { WriteFileController } from './write-file.controller';
import { WriteFileService } from './write-file.service';

@Module({
  controllers: [WriteFileController],
  providers: [WriteFileService],
})
export class WriteFileModule {}
