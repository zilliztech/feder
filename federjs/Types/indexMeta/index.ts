import {
  TIndexMetaHnsw,
  TIndexMetaHnswGraphNode,
  TIndexMetaHnswGraph,
} from "./indexMetaHnsw";

import {
  TIndexMetaIvfflat,
  TIndexMetaIvfflatCluster,
} from "./indexMetaIvfflat";

type TIndexMeta = TIndexMetaIvfflat | TIndexMetaHnsw;

export {
  TIndexMeta,
  TIndexMetaHnsw,
  TIndexMetaHnswGraphNode,
  TIndexMetaHnswGraph,
  TIndexMetaIvfflat,
  TIndexMetaIvfflatCluster,
};
