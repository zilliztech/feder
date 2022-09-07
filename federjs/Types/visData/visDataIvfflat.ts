import { EProjectMethod, TCoord, TId, TVec, TViewParams } from 'Types';

export interface TVisDataIvfflatOverview {
  overviewClusters: TVisDataIvfflatOverviewCluster[];
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
  projectPos: TCoord;
}

export interface TVisDataIvfflatSearchViewNode {
  id: TId;
  clusterId: TId;
  distance: number;
  inTopK: boolean;
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

export interface TVisDataIvfflatSearchView {
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  searchViewNodes: TVisDataIvfflatSearchViewNode[];
  targetNode: TVisDataIvfflatSearchViewTargetNode;
  polarOrigin: TCoord;
  polarR: number;
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
  nonTopkNodeR?: number;
  polarRadiusUpperBound?: number;

  projectPadding?: [number, number, number, number];
}

export interface TViewParamsIvfflat extends TViewParams {
  width: number;
  height: number;
  canvasScale: number;

  nonNprobeClusterFill: string;
  nonNprobeClusterOpacity: number;
  nonNprobeClusterStroke: string;
  nonNprobeClusterStrokeWidth: number;
  nprobeClusterFill: string;
  nprobeClusterOpacity: number;
  nprobeClusterStroke: string;
  nprobeClusterStrokeWidth: number;
  hoveredClusterFill: string;
  hoveredClusterOpacity: number;
  hoveredClusterStroke: string;
  hoveredClusterStrokeWidth: number;

  targetOuterR: number;
  targetInnerR: number;
  targetNodeStroke: string;

  topkNodeR: number;
  topkNodeOpacity: number;
  nonTopkNodeR: number;
  nonTopkNodeOpacity: number;
  highlightNodeR: number;
  highlightNodeStroke: string;
  highlightNodeStrokeWidth: number;
  highlightNodeOpacity: number;

  polarAxisTickCount: number;
  polarAxisStrokeWidth: number;
  polarAxisStroke: string;
  polarAxisOpacity: number;

  transitionClustersExitTime: number;
  transitionReplaceTime: number;
  transitionNodesEnterTime: number;
  transitionNodesMoveTime: number;
}
