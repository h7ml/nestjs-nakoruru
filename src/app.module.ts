import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';

@Module({
  imports: [GirlModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
