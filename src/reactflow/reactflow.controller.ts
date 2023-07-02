import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReactflowService } from './reactflow.service';
import { CreateReactflowDto } from './dto/create-reactflow.dto';
import { UpdateReactflowDto } from './dto/update-reactflow.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('react flow')
@Controller('reactflow')
export class ReactflowController {
  constructor(private readonly reactflowService: ReactflowService) {}

  @Post()
  create(@Body() createReactflowDto: CreateReactflowDto) {
    return this.reactflowService.create(createReactflowDto);
  }

  @Get()
  findAll() {
    return this.reactflowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactflowService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactflowDto: UpdateReactflowDto,
  ) {
    return this.reactflowService.update(+id, updateReactflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactflowService.remove(+id);
  }
}
