import { TStopColor } from 'FederView/renderUtils2D';
import {
  EHnswLinkType,
  EHnswNodeType,
  TCoord,
  TId,
  TSearchParams,
  TViewParams,
} from 'Types';
import { TIndexMetaHnswGraphNode } from 'Types/indexMeta';

export interface TFroceNode {
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
  index?: number;
}
export interface TVisDataHnswGraphNode
  extends TIndexMetaHnswGraphNode,
    TFroceNode {
  level?: number;
  idWithLevel?: string;
  pathFromEntry?: string[];
  forcePos?: TCoord;
  overviewPos?: TCoord;
}

export interface TVisDataHnswGraph {
  level: number;
  nodes: TVisDataHnswGraphNode[];
}

export interface TVisDataHnswOverview {
  overviewNodesLevels: TVisDataHnswGraph[];
  overviewLayerPosLevels: TCoord[][];
  M: number;
  efConstruction: number;
  ntotal: number;
  nlevels: number;
  nodesCount: number[];
  linksCount: number[];
}

export interface TVisDataHnswNode {
  id: TId;
  type: EHnswNodeType;
  dist: number;
  source?: TId;
  forcePos?: TCoord;
  x?: number;
  y?: number;
  r?: number;
  searchViewPosLevels?: TCoord[];
  inProcessP?: number;
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
  inprocessP?: number;
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
  M?: number;
  efConstruction?: number;
  ntotal?: number;
  nodesCount?: number[];
  linksCount?: number[];
}

export interface TViewParamsHnsw extends TViewParams {
  width: number;
  height: number;
  padding: [number, number, number, number];
  canvasScale: number;

  layerDotNum: number;
  layerDotFill: string;
  layerDotOpacity: number;
  layerDotR: number;
  layerBorderStroke: string;
  layerBorderOpacity: number;
  layerBorderStrokeWidth: number;
  layerGradientStopColors: TStopColor[];

  searchInterLevelTime: number;
  searchIntraLevelTime: number;

  nodeEllipseRatio: number;
  nodeShadowBlur: number;
  coarseNodeFill: string;
  coarseNodeOpacity: number;
  candidateNodeFill: string;
  candidateNodeOpacity: number;
  fineNodeFill: string;
  fineNodeOpacity: number;
  targetNodeFill: string;
  targetNodeOpacity: number;

  linkShortenLineD: number;
  normalLinkWidth: number;
  normalGradientStopColors: TStopColor[];
  importantLinkWidth: number;
  importantGradientStopColors: TStopColor[];
  targetLinkWidth: number;
  targetGradientStopColors: TStopColor[];

  mouseThresholdR: number;
  clickedNodeStroke: string;
  clickedNodeStrokeWidth: number;

  overviewNodesR: number[];

  tipLineOffset?: TCoord;
  tipLineAngle?: number;
  tipLineColor?: string;
  tipLineWidth?: number;

  staticPanelWidth?: number;
  hoveredPanelWidth: number;
  clickedPanelWidth: number;
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
