import {
  TSearchRecordsHnswLayerItem,
  TSearchRecordsHnswLayer,
  TSearchRecordsHnsw,
} from "./searchRecordsHnsw";

import {
  TSearchRecordsIvfflatCoarseCluster,
  TSearchRecordsIvfflatFineNode,
  TSearchRecordsIvfflat,
} from "./searchRecordsIvfflat";

type TSearchRecords = TSearchRecordsIvfflat | TSearchRecordsHnsw;

export {
  TSearchRecords,
  TSearchRecordsHnswLayerItem,
  TSearchRecordsHnswLayer,
  TSearchRecordsHnsw,
  TSearchRecordsIvfflatCoarseCluster,
  TSearchRecordsIvfflatFineNode,
  TSearchRecordsIvfflat,
};
