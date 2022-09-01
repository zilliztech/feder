import {
  EHnswLinkType,
  EHnswNodeType,
  TCoord,
  TId,
  TSearchParams,
} from 'Types';

export interface TVisDataHnswOverview {}

export interface TVisDataHnswNode {
  id: TId;
  type: EHnswNodeType;
  dist: number;
  forcePos?: TCoord;
  x?: number;
  y?: number;
  r?: number;
  searchViewPosLevels?: TCoord[];
}

export interface TVisDataHnswTargetNode {
  id: TId;
  r: number;
  searchViewPosLevels: TCoord[];
}

export interface TVisDataHnswLink {
  source: TId;
  target: TId;
  type: EHnswLinkType;
  // sourceNode: TVisDataHnswNode;
  // targetNode: TVisDataHnswNode;
}

export interface TVisDataHnswParsedDataLevel {
  entryIds: [TId];
  fineIds: TId[];
  links: TVisDataHnswLink[];
  nodes: TVisDataHnswNode[];
}

export interface TVisDataHnswSearchView {
  searchTarget: TVisDataHnswTargetNode;
  entryNodesLevels: TVisDataHnswNode[][];
  searchNodesLevels: TVisDataHnswNode[][];
  searchLinksLevels: TVisDataHnswLink[][];
  searchLayerPosLevels: TCoord[][];
  searchTargetShowTime: number[];
  searchNodeShowTime: TId2ShowTime;
  searchLinkShowTime: TId2ShowTime;
  searchTransitionDuration: number;
  searchParams: TSearchParams;
}

export interface TViewParamsHnsw {
  width: number;
  height: number;
  canvasScale: number;
}

export interface TLayoutParamsHnsw {
  width: number;
  height: number;
  canvasScale: number;
  targetOrigin: TCoord;
  numForceIterations: number;
  padding: [number, number, number, number];
  xBias: number;
  yBias: number;
  yOver: number;

  targetR: number;
  searchViewNodeBasicR: number;
  searchViewNodeRStep: number;

  searchInterLevelTime: number;
  searchIntraLevelTime: number;
}

export interface TId2ShowTime {
  [id: TId]: number;
}
