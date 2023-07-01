import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@ApiTags('system')
@ApiTags('hotapi')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: '获取所有菜单' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async findAll() {
    try {
      const data = await this.menuService.findAll();
      return {
        code: 200,
        message: '获取成功',
        total: data.length,
        data,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个菜单' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  async findOne(@Param('id') id: number) {
    try {
      // const data = await this.menuService.findOne(id);
      return {
        code: 200,
        message: '获取成功',
        data: [],
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({ summary: '创建新菜单' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 500, description: '创建失败' })
  async create(@Body() menu: Menu) {
    try {
      await this.menuService.create(menu);
      return {
        code: 201,
        message: '创建成功',
      };
    } catch (error) {
      throw new HttpException('创建失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '更新菜单' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 500, description: '更新失败' })
  async update(@Param('id') id: number, @Body() menu: Menu) {
    try {
      await this.menuService.update(id, menu);
      return {
        code: 200,
        message: '更新成功',
      };
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 500, description: '删除失败' })
  async delete(@Param('id') id: number) {
    try {
      await this.menuService.delete(id);
      return {
        code: 200,
        message: '删除成功',
      };
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
