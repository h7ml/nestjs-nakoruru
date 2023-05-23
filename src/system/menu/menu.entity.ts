import { ApiProperty } from '@nestjs/swagger';

export class Menu {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  path: string;

  @ApiProperty({ required: false })
  icon?: string;

  @ApiProperty({ required: false })
  parentId?: number;

  @ApiProperty({ required: false })
  children?: Menu[];
}
