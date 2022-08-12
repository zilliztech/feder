export type TVec = number[];
export type TId = number;
export type TCoord = [number, number];

export enum EIndexType {
  hnsw = "hnsw",
  ivfflat = "ivfflat",
}

export enum EMetricType {
  METRIC_INNER_PRODUCT = 0, ///< maximum inner product search
  METRIC_L2 = 1, ///< squared L2 search
  METRIC_L1 = 2, ///< L1 (aka cityblock)
  METRIC_Linf = 3, ///< infinity distance
  METRIC_Lp = 4, ///< L_p distance, p is given by a faiss::Index
  /// metric_arg

  /// some additional metrics defined in scipy.spatial.distance
  METRIC_Canberra = 20,
  METRIC_BrayCurtis = 21,
  METRIC_JensenShannon = 22,
}

export enum EActionType {
  overview = "overview",
  search = "search",
}

export enum EViewType {
  normal = "normal",
  hnsw3d = "hnsw3d",
}

export interface TSearchParams {
  k: number;
  ef?: number;
  nprobe?: number;
  metricType?: EMetricType;
}

export enum EHnswNodeType {
  Coarse = 1,
  Candidate = 2,
  Fine = 3,
  Target = 4,
}

export enum EHnswLinkType {
  None = 0,
  Visited = 1,
  Extended = 2,
  Searched = 3,
  Fine = 4,
}

