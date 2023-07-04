import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { Database } from './entities/database.entity';

@ApiTags('system')
@ApiTags('sdatabaseystem')
@Controller('system/database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  @ApiOperation({ summary: '创建新数据库' })
  @ApiResponse({ status: 201, description: '数据库创建成功' })
  @ApiResponse({ status: 500, description: '数据库创建失败' })
  create(@Body() createDatabaseDto: CreateDatabaseDto): Promise<Database> {
    return this.databaseService.createDatabase(createDatabaseDto);
  }

  @Get('/by-table/:tableName')
  @ApiOperation({ summary: '根据表名获取数据库信息' })
  @ApiParam({
    name: 'tableName',
    description: '要查询的表名',
    example: 'users1',
  })
  @ApiParam({
    name: 'rows',
    description: '要选择的列，逗号分隔',
    example: 'id,name,email',
    required: false,
  })
  @ApiParam({
    name: 'page',
    description: '页码',
    example: 1,
    required: false,
  })
  @ApiParam({
    name: 'pageSize',
    description: '每页数据条数',
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取数据库信息',
    type: Database,
  })
  @ApiResponse({ status: 404, description: '未找到数据库信息' })
  async getDatabaseByTable(
    @Param('tableName') tableName: string,
    @Query('rows') rows?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<any> {
    if (rows) {
      const selectedColumns = rows.split(',');
      return this.databaseService.getDatabaseByTableRows(
        tableName,
        selectedColumns,
        page,
        pageSize,
      );
    } else {
      return this.databaseService.getDatabaseByTable(tableName, page, pageSize);
    }
  }

  // @Get(':id')
  // @ApiOperation({ summary: '根据 ID 获取数据库信息' })
  // @ApiResponse({ status: 200, description: '成功获取数据库信息' })
  // @ApiResponse({ status: 404, description: '未找到数据库信息' })
  // findOne(@Param('id') id: string): Promise<Database> {
  //   return this.databaseService.getDatabaseById(id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: '更新数据库信息' })
  @ApiResponse({ status: 200, description: '成功更新数据库信息' })
  @ApiResponse({ status: 404, description: '未找到数据库信息' })
  update(
    @Param('id') id: string,
    @Body() updateDatabaseDto: UpdateDatabaseDto,
  ): Promise<Database> {
    return this.databaseService.updateDatabase(id, updateDatabaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据库' })
  @ApiResponse({ status: 204, description: '成功删除数据库' })
  @ApiResponse({ status: 404, description: '未找到数据库信息' })
  remove(@Param('id') id: string): Promise<void> {
    return this.databaseService.deleteDatabase(id);
  }
}
