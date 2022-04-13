export const INDEX_TYPE = {
  IVFFlat: 'IVFFlat',
  FlatL2: 'FlatL2',
  FlatIR: 'FlatIR',
  Flat: 'Flat',
  HNSW: 'HNSW',
};

export const VIEW_TYPE = {
  Overview: 'Overview',
  Search: 'Search',
};

export const STEP = {
  FineSearch: 'FineSearch',
  CoarseSearch: 'CoarseSearch',
};

export const STEP_TYPE = {
  Init: 'Init',
  Polar: 'Polar',
  Project: 'Project',
};

export const ANiMATION_TYPE = {
  Enter: 'Enter',
  Exit: 'Exit',
};

export const SOURCE_TYPE = {
  Faiss: 'faiss',
  HNSWlib: 'hnswlib',
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
