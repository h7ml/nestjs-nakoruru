import { Module } from '@nestjs/common';
import { Fenglou7Service } from './fenglou7.service';
import { Fenglou7Controller } from './fenglou7.controller';

@Module({
  controllers: [Fenglou7Controller],
  providers: [Fenglou7Service],
})
export class Fenglou7Module {}
