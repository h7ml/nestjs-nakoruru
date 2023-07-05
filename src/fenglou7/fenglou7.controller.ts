import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Fenglou7Service } from './fenglou7.service';
import { CreateFenglou7Dto } from './dto/create-fenglou7.dto';
import { UpdateFenglou7Dto } from './dto/update-fenglou7.dto';
import {
  ApiResponse as EntityResponse,
  Fenglou7,
} from './entities/fenglou7.entity';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

class QueryParams {
  @IsInt()
  @Min(1)
  @Max(1374)
  @Transform(({ value }) => Number(value))
  page: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  perPage: number;
}

@Controller('fenglou7')
@ApiTags('fenglou7')
export class Fenglou7Controller {
  constructor(private readonly fenglou7Service: Fenglou7Service) {}
  @Get()
  @ApiQuery({
    name: 'perPage',
    description: '每页显示的记录数',
    example: '10',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '页码',
    example: '1',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取信息',
    type: Fenglou7,
  })
  @ApiResponse({ status: 404, description: '未找到信息' })
  async findAll(@Query() query: QueryParams): Promise<EntityResponse> {
    return this.fenglou7Service.findAll(query.perPage, query.page);
  }
}
