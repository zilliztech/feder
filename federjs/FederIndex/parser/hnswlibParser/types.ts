import { TVec, TId, EIndexType } from "Types";
export type THnswlibLinkList = TId[];
export type THnswlibLinkLists = THnswlibLinkList[];

export interface TIndexStructureHnswDetail {
  offsetLevel0_: number;
  max_elements_: number;
  cur_element_count: number;
  size_data_per_element_: number;
  label_offset_: number;
  offsetData_: number;
  dim: number;
  maxlevel_: number;
  enterpoint_node_: TId;
  maxM_: number;
  maxM0_: number;
  M: number;
  mult_: number;
  ef_construction_: number;
  size_links_per_element_: number;
  size_links_level0_: number;
  revSize_: number;
  ef_: number;
  linkListSizes: number[];
  linkLists_: THnswlibLinkLists[];
  vectors: TVec[];
  linkLists_level0_count: number[];
  linkLists_level0: THnswlibLinkLists;
  externalLabel: TId[];
  isDeleted: number[];
  num_deleted_: number;
}

export interface TIndexStructureHnsw {
  indexType: EIndexType;
  ntotal: number;
  vectors: TVec[];
  maxLevel: number;
  linkLists_level0_count: number[];
  linkLists_level_0: THnswlibLinkLists;
  linkLists_levels: THnswlibLinkLists[];
  enterPoint: TId;
  labels: TId[];
  isDeleted: number[];
  numDeleted: number;
  M: number;
  ef_construction: number;
}
