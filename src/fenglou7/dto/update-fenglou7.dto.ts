import { PartialType } from '@nestjs/swagger';
import { CreateFenglou7Dto } from './create-fenglou7.dto';

export class UpdateFenglou7Dto extends PartialType(CreateFenglou7Dto) {}
