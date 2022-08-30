import { EActionType, EIndexType, EViewType, TSearchParams, TVec } from 'Types';

export type TVisData = any;
export interface TVisDataAll {
  indexType: EIndexType;
  actionType: EActionType;
  actionData?: TAcitonData;
  viewType: EViewType;
  visData: TVisData;
}

export interface TAcitonData {
  target: TVec;
  targetUrl?: string;
  searchParams: TSearchParams;
}

export interface TopkResult {
  id: number;
  internalId: number;
  dis: number;
}

export interface SearchParams {
  k: number;
  ef: number;
}

export interface SearchRecords {
  searchRecords: number[][][];
  topkResults: TopkResult[];
  searchParams: SearchParams;
}

export interface TVisDataHnsw3d {
  visData: VisDaum[];
  id2forcePos: Id2forcePos;
  searchTarget: SearchTarget;
  entryNodesLevels: EntryNodesLevel[][];
  searchNodesLevels: SearchNodesLevel[][];
  searchLinksLevels: SearchLinksLevel[][];
  searchRecords: SearchRecords;
}

export interface VisDaum {
  entryIds: string[];
  fineIds: string[];
  links: Link[];
  nodes: Node[];
}

export interface Link {
  source: any;
  target: any;
  type: number;
  index?: number;
}

export interface Node {
  id: string;
  type: number;
  dist: number;
  forcePos: number[];
  x: number;
  y: number;
  searchViewPosLevels: any[][];
  r: number;
}

export interface Id2forcePos {
  [key: string]: number[];
}

export interface SearchTarget {
  id: string;
  r: number;
  searchViewPosLevels: any[][];
}

export interface EntryNodesLevel {
  id: string;
  type: number;
  dist: number;
  forcePos: number[];
  x: number;
  y: number;
  searchViewPosLevels: any[][];
  r: number;
}

export interface SearchNodesLevel {
  id: string;
  type: number;
  dist: number;
  forcePos: number[];
  x: number;
  y: number;
  searchViewPosLevels: any[][];
  r: number;
}

export interface SearchLinksLevel {
  source: Source;
  target: Target;
  type: number;
}

export interface Source {
  id: string;
  type: number;
  dist: number;
  forcePos: number[];
  x: number;
  y: number;
  searchViewPosLevels: any[][];
  r: number;
}

export interface Target {
  id: string;
  type: number;
  dist: number;
  forcePos: number[];
  x: number;
  y: number;
  searchViewPosLevels: any[][];
  r: number;
}
