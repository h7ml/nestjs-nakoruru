import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John', description: '名字' })
  @IsNotEmpty({ message: '请输入名字' })
  @MaxLength(300, { message: '名字长度不能超过300个字符' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: '姓' })
  @IsNotEmpty({ message: '请输入姓' })
  @MaxLength(300, { message: '姓长度不能超过300个字符' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: '电子邮件地址' })
  @IsNotEmpty({ message: '请输入有效的电子邮件地址' })
  @IsEmail({}, { message: '请输入有效的电子邮件地址' })
  @MaxLength(300, { message: '电子邮件地址长度不能超过300个字符' })
  email: string;

  @ApiProperty({ example: 'IT', description: '部门' })
  @IsNotEmpty({ message: '请输入部门' })
  @MaxLength(300, { message: '部门长度不能超过300个字符' })
  department: string;

  @ApiProperty({ example: 'Active', description: '状态' })
  @IsNotEmpty({ message: '请输入状态' })
  @MaxLength(300, { message: '状态长度不能超过300个字符' })
  status?: string;
}
