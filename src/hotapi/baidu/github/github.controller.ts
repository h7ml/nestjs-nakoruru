import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';
@ApiTags('百度开发者github')
@Controller('hotapi/baidu/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  getGithubData() {
    return this.githubService.getGithubData();
  }
}
