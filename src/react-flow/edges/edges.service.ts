import { Injectable } from '@nestjs/common';
import { Edge } from './edge.interface';
import * as Mock from 'mockjs';

@Injectable()
export class EdgesService {
  getEdges(): Edge[] {
    const edges: Edge[] = Mock.mock({
      'edges|7': [
        {
          id: '@id',
          source: '@id',
          target: '@id',
          label: '@ctitle',
          className: 'normal-edge',
          type: '@pick(["smoothstep", "step", "straight"])',
          animated: '@boolean',
          style: {
            stroke: '@color',
          },
          labelStyle: {
            fill: '@color',
            fontWeight: 700,
          },
          markerEnd: {
            type: '@pick(["Arrow", "ArrowClosed"])',
          },
          labelBgPadding: ['@integer(4, 8)', '@integer(2, 6)'],
          labelBgBorderRadius: '@integer(2, 4)',
          labelBgStyle: {
            fill: '@color',
            color: '#fff',
            fillOpacity: '@float(0, 1)',
          },
        },
      ],
    }).edges;

    return edges;
  }
}
