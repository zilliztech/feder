import { TId } from "Types";

export interface TIndexMetaHnswGraphNode {
  id: TId;
  links: TId[];
}

export interface TIndexMetaHnswGraph {
  level: number;
  nodes: TIndexMetaHnswGraphNode[];
}

export interface TIndexMetaHnsw {
  efConstruction: number;
  M: number;
  ntotal: number;
  ndeleted?: number;
  nlevels: number;
  entryPointId: TId;
  nOverviewLevels: number;
  overviewGraphLayers: TIndexMetaHnswGraph[];
}