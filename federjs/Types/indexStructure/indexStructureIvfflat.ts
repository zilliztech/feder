import { EIndexType, EMetricType, TId, TVec } from 'Types';

export enum EFaissIndexHeader {
  ivfflat = 'IwFl',
  flatL2 = 'IxF2',
  flatIR = 'IxFI',
}

export type TDirectMap = any;

export interface TInvListData {
  ids: TId[];
  vectors: TVec[];
}
export interface TInvlists {
  codeSize?: number;
  h?: string;
  listSizes: number[];
  listSizesSize: number;
  listType: string;
  nlist?: number;
  data: TInvListData[]
}

export interface TFlatIndex {
  codeSize?: number;
  d?: number;
  h?: EFaissIndexHeader;
  indexType?: EIndexType;
  isTrained?: boolean;
  metricType?: EMetricType;
  ntotal?: number;
  vectors?: TVec[];
}

export type TIndexStructureIvfflat = {
  indexType?: EIndexType;
  h?: EFaissIndexHeader;
  d?: number;
  directMap?: TDirectMap;
  invlists?: TInvlists;
  isTrained?: boolean;
  metricType?: EMetricType;
  nlist?: number;
  nprobe?: number;
  ntotal?: number;
  childIndex?: TFlatIndex;
};
