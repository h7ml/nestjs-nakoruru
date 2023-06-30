import { Injectable } from '@nestjs/common';
import { Node } from './node.interface';
import * as Mock from 'mockjs';

@Injectable()
export class NodesService {
  getNodes(): Node[] {
    const nodes: Node[] = Mock.mock({
      'nodes|8': [
        {
          id: '@id',
          type: '@pick(["input", "default", "output"])',
          data: { label: '@ctitle' },
          position: { x: '@integer(0, 500)', y: '@integer(0, 500)' },
        },
      ],
    }).nodes;

    return nodes;
  }
}
