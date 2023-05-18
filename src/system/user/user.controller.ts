import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('娜可露露')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.userService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  findOne(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: this.userService.findOne(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建新用户' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 500, description: '创建失败' })
  async create(@Body() user: User) {
    await this.userService.create(user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully.',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 500, description: '更新失败' })
  async update(@Param('id') id: number, @Body() user: User) {
    await this.userService.update(id, user);
    return {
      statusCode: HttpStatus.OK,
      message: `User with id ${id} updated successfully.`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 204, description: '删除成功' })
  @ApiResponse({ status: 500, description: '删除失败' })
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `User with id ${id} deleted successfully.`,
    };
  }
}
