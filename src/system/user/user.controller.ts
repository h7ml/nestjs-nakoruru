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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedUserDto } from './dto/paginated-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('system')
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建新用户' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 500, description: '创建失败' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: false })
  @ApiQuery({ name: 'limit', type: Number, example: 50, required: false })
  @ApiResponse({ status: 200, description: '获取成功', type: PaginatedUserDto })
  @ApiResponse({ status: 500, description: '获取失败' })
  findAll(@Query() queryUserDto?: QueryUserDto): Promise<PaginatedUserDto> {
    const { page, limit } = queryUserDto || {}; // Default values if queryUserDto is undefined
    return this.userService.findAll(page || 1, limit || 50);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 500, description: '获取失败' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 500, description: '更新失败' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 500, description: '删除失败' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
