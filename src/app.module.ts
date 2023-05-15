import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { JuejinModule } from './juejin/juejin.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/pages/home/'),
      exclude: ['/api*'],
    }),
    GirlModule,
    JuejinModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
