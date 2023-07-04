import { PartialType } from '@nestjs/swagger';
import { CreateDatabaseDto } from './create-database.dto';

export class UpdateDatabaseDto extends PartialType(CreateDatabaseDto) {}
