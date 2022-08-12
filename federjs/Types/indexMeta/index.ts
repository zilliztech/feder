import {
  IIndexMetaHnsw,
  TIndexMetaHnswGraphNode,
  TIndexMetaHnswGraph,
} from "./indexMetaHnsw";

import {
  TIndexMetaIvfflat,
  TIndexMetaIvfflatCluster,
} from "./indexMetaIvfflat";

type TIndexMeta = TIndexMetaIvfflat | IIndexMetaHnsw;

export {
  TIndexMeta,
  IIndexMetaHnsw,
  TIndexMetaHnswGraphNode,
  TIndexMetaHnswGraph,
  TIndexMetaIvfflat,
  TIndexMetaIvfflatCluster,
};
