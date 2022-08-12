import { TVec, TId } from "Types";

export interface TIndexMetaIvfflatCluster {
  clusterId: TId;
  ids: TId[];
  centroidVectors: TVec[];
}

export interface TIndexMetaIvfflat {
  nlist: number;
  ntotal: number;
  ndeleted: number;
  clusters: TIndexMetaIvfflatCluster[];
}
