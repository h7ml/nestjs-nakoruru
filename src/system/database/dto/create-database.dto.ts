import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateDatabaseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  host: string;

  @IsInt()
  port: number;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  department?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  status?: string;
}
