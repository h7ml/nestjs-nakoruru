import { MarkerType } from 'react-flow-renderer';

export interface Edge {
  id: string;
  source: string;
  target: string;
  label: string;
  className: string;
  type?: string;
  animated?: boolean;
  style?: {
    stroke: string;
  };
  labelStyle?: {
    fill: string;
    fontWeight: number;
  };
  markerEnd?: {
    type: MarkerType;
  };
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  labelBgStyle?: {
    fill: string;
    color: string;
    fillOpacity: number;
  };
}
