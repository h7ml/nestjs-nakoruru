import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar?: any;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  banner?: any[];
}
