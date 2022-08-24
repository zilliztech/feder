import { TVec, TId, TSearchParams } from "Types";

export interface TSearchRecordsIvfflatCoarseCluster {
  clusterId: TId;
  distance: number;
  vector?: TVec;
}

export interface TSearchRecordsIvfflatFineNode {
  id: TId;
  clusterId: TId;
  distance: number;
  vector: TVec;
}

export interface TSearchRecordsIvfflat {
  coarseSearchRecords: TSearchRecordsIvfflatCoarseCluster[];
  nprobeClusterIds: TId[];
  fineSearchRecords: TSearchRecordsIvfflatFineNode[];
  topKVectorIds: TId[];
  searchParams: TSearchParams;
}
