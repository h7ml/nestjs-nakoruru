import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  status: string;
}
export class PaginatedUserDto {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];

  @ApiProperty()
  total: number;
}
