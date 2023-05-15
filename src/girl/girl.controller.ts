import { Controller, Get } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) { }
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
}
