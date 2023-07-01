import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';

enum LanguageOption {
  None = '语言不限',
  Python = 'Python',
  C = 'C',
  Java = 'Java',
  'C++' = 'C++',
  'C#' = 'C#',
  JavaScript = 'JavaScript',
  PHP = 'PHP',
  Go = 'Go',
  Swift = 'Swift',
  Ruby = 'Ruby',
  'Visual Basic' = 'Visual Basic',
  Assembly = 'Assembly',
  SQL = 'SQL',
  Pascal = 'Pascal',
  R = 'R',
  'Objective-C' = 'Objective-C',
  Perl = 'Perl',
  Lua = 'Lua',
  MATLAB = 'MATLAB',
  Kotlin = 'Kotlin',
  Rust = 'Rust',
  SAS = 'SAS',
  Fortran = 'Fortran',
  COBOL = 'COBOL',
  Ada = 'Ada',
  Prolog = 'Prolog',
  PowerShell = 'PowerShell',
  Julia = 'Julia',
  Dart = 'Dart',
  Vue = 'Vue',
}

enum SinceOption {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

@ApiTags('hotapi')
@Controller('hotapi/baidu/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  @ApiOperation({ summary: '百度开发者github' })
  @ApiQuery({ name: 'optionLanguage', enum: LanguageOption, required: false })
  @ApiQuery({ name: 'optionSince', enum: SinceOption, required: false })
  @ApiResponse({ status: 200, description: '获取百度开发者github成功' })
  @ApiResponse({ status: 500, description: '获取百度开发者github失败' })
  getGithubData(
    @Query('optionLanguage') optionLanguage?: LanguageOption,
    @Query('optionSince') optionSince?: SinceOption,
  ) {
    const defaultSince = SinceOption.WEEKLY;
    return this.githubService.getGithubData(
      optionLanguage || '',
      optionSince || defaultSince,
    );
  }
}
