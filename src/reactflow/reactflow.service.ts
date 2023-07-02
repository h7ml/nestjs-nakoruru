import { Injectable } from '@nestjs/common';
import { CreateReactflowDto } from './dto/create-reactflow.dto';
import { UpdateReactflowDto } from './dto/update-reactflow.dto';

@Injectable()
export class ReactflowService {
  create(createReactflowDto: CreateReactflowDto) {
    return 'This action adds a new reactflow';
  }

  findAll() {
    return `This action returns all reactflow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reactflow`;
  }

  update(id: number, updateReactflowDto: UpdateReactflowDto) {
    return `This action updates a #${id} reactflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} reactflow`;
  }
}
