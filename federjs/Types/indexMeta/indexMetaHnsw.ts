import { TId } from "Types";

export interface TIndexMetaHnswGraphNode {
  id: TId;
  links: TId[];
}

export interface TIndexMetaHnswGraph {
  level: number;
  nodes: TIndexMetaHnswGraphNode[];
}

export interface IIndexMetaHnsw {
  efConstruction: number;
  M: number;
  ntotal: number;
  ndeleted: number;
  nLevels: number;
  entryPointId: TId;
  nOverviewLevels: number;
  overviewGraphLayers: TIndexMetaHnswGraph[];
}