export const SOURCE_TYPE = {
  hnswlib: 'hnswlib',
  faiss: 'faiss',
};

export const INDEX_TYPE = {
  hnsw: 'hnsw',
  ivf_flat: 'ivf_flat',
  flat: 'flat',
};

export const PROJECT_METHOD = {
  umap: 'umap',
  tsne: 'tsne',
}

// faiss config
export const MetricType = {
  METRIC_INNER_PRODUCT: 0, ///< maximum inner product search
  METRIC_L2: 1, ///< squared L2 search
  METRIC_L1: 2, ///< L1 (aka cityblock)
  METRIC_Linf: 3, ///< infinity distance
  METRIC_Lp: 4, ///< L_p distance, p is given by a faiss::Index
  /// metric_arg

  /// some additional metrics defined in scipy.spatial.distance
  METRIC_Canberra: 20,
  METRIC_BrayCurtis: 21,
  METRIC_JensenShannon: 22,
};

export const DirectMapType = {
  NoMap: 0, // default
  Array: 1, // sequential ids (only for add, no add_with_ids)
  Hashtable: 2, // arbitrary ids
};

export const IndexHeader = {
  IVFFlat: 'IwFl',
  FlatL2: 'IxF2',
  FlatIR: 'IxFI',
};

export const HNSW_NODE_TYPE = {
  Coarse: 1,
  Candidate: 2,
  Fine: 3,
  Target: 4,
};

export const HNSW_LINK_TYPE = {
  None: 0,
  Visited: 1,
  Extended: 2,
  Searched: 3,
  Fine: 4,
};

export const VIEW_TYPE = {
  overview: 'overview',
  search: 'search',
}

export const SEARCH_VIEW_TYPE = {
  voronoi: 'voronoi',
  polar: 'polar',
  project: 'project',
}

export const ANIMATION_TYPE = {
  exit: 'exit',
  enter: 'enter',
}
