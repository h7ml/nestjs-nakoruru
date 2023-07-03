import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class QueryUserDto {
  // @ApiProperty({ example: 'Active', description: '状态' })
  // @IsOptional()
  // @IsPositive()
  // status?: string;

  @ApiProperty({ example: 2, description: '页码' })
  @IsOptional()
  @IsPositive()
  page?: number;

  @ApiProperty({ example: 50, description: '每页数量' })
  @IsOptional()
  @IsPositive()
  limit?: number;
}
