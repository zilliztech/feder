import {
  EActionType,
  EIndexType,
  EProjectMethod,
  EViewType,
  TCoord,
  TId,
  TMetaParams,
  TSearchParams,
  TVec,
} from 'Types';

export type TVisData = any;
export interface TVisDataAll {
  indexType: EIndexType;
  actionType: EActionType;
  actionData?: TAcitonData;
  viewType: EViewType;
  visData: TVisData;
}

export interface TAcitonData {
  target?: TVec;
  targetUrl?: string;
  searchParams?: TSearchParams;
  metaParams?: TMetaParams;
}

export interface TVisDataIvfflatOverview {
  clusters: TVisDataIvfflatOverviewCluster[];
  voronoi: d3.Voronoi<d3.Delaunay.Point>;
}

export interface TVisDataIvfflatOverviewCluster {
  clusterId: TId;
  ids: TId[];
  count: number;
  countP: number;
  countArea: number;
  x: number;
  y: number;
  r: number;

  oriProjection: TCoord;
  forceProjection: TCoord;

  OVPolyPoints: TCoord[];
  OVPolyCentroid: TCoord;
}

export interface TVisDataIvfflatSearchViewCluster
  extends TVisDataIvfflatOverviewCluster {
  distance: number;
  inNprobe: boolean;
  SVPos: TCoord;
  SVPolyPoints: TCoord[];
  SVPolyCentroid: TCoord;
  polarOrder?: number;
  SVNextLevelPos?: TCoord;
  SVNextLevelTran?: TCoord;
}

export interface TVisDataIvfflatSearchViewTargetNode {
  clusterId: TId;
  SVPos: TCoord;
  isLeft_coarseLevel: boolean;
  polarPos: TCoord;
}

export interface TVisDataIvfflatSearchViewNode {
  id: TId;
  clusterId: TId;
  distance: number;
  vector: TVec;
  polarOrder?: number;
  voronoiPos?: TCoord;
  x?: number;
  y?: number;
  r?: number;
  polarPos?: TCoord;
  projection?: TCoord;
  projectPos?: TCoord;
}

export interface TLayoutParamsIvfflat {
  width?: number;
  height?: number;
  coarseSearchWithProjection?: boolean;
  fineSearchWithProjection?: boolean;
  projectMethod?: EProjectMethod;
  projectParams?: any;

  minVoronoiRadius?: number;
  canvasScale?: number;
  numForceIterations?: number;
  polarOriginBias?: number;
  nonTopKNodeR?: number;

  projectPadding?: [number, number, number, number];
}
