import { PartialType } from '@nestjs/swagger';
import { CreateReactflowDto } from './create-reactflow.dto';

export class UpdateReactflowDto extends PartialType(CreateReactflowDto) {}
