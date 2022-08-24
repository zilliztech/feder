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
}
