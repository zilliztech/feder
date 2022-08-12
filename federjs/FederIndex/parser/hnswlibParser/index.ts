import HNSWlibFileReader from "./HNSWlibFileReader.js";
import { EIndexType } from "Types";
import { TIndexStructureHnswDetail, TIndexStructureHnsw } from "./types";
export { TIndexStructureHnsw } from "./types";

export const hnswlibIndexParser = (arrayBuffer: ArrayBuffer) => {
  const reader = new HNSWlibFileReader(arrayBuffer);
  const index = {} as TIndexStructureHnswDetail;
  index.offsetLevel0_ = reader.readUint64();
  index.max_elements_ = reader.readUint64();
  index.cur_element_count = reader.readUint64();
  // index.ntotal = index.cur_element_count; // consistent with Faiss
  index.size_data_per_element_ = reader.readUint64();
  index.label_offset_ = reader.readUint64();
  index.offsetData_ = reader.readUint64();
  index.dim = (index.size_data_per_element_ - index.offsetData_ - 8) / 4;

  index.maxlevel_ = reader.readUint32();
  index.enterpoint_node_ = reader.readUint32();
  index.maxM_ = reader.readUint64();
  index.maxM0_ = reader.readUint64();
  index.M = reader.readUint64();

  index.mult_ = reader.readFloat64();
  index.ef_construction_ = reader.readUint64();

  index.size_links_per_element_ = index.maxM_ * 4 + 4;
  index.size_links_level0_ = index.maxM0_ * 4 + 4;
  index.revSize_ = 1.0 / index.mult_;
  index.ef_ = 10;

  read_data_level0_memory_(reader, index);

  const linkListSizes = [];
  const linkLists_ = [];
  for (let i = 0; i < index.cur_element_count; i++) {
    const linkListSize = reader.readUint32();
    linkListSizes.push(linkListSize);
    if (linkListSize === 0) {
      linkLists_[i] = [];
    } else {
      const levelCount = linkListSize / 4 / (index.maxM_ + 1);
      linkLists_[i] = Array(levelCount)
        .fill(0)
        .map((_) => reader.readUint32Array(index.maxM_ + 1))
        .map((linkLists) => linkLists.slice(1, linkLists[0] + 1));
      // .filter((a) => a.length > 0);
    }
  }
  index.linkListSizes = linkListSizes;
  index.linkLists_ = linkLists_;

  console.assert(
    reader.isEmpty,
    "HNSWlib Parser Failed. Not empty when the parser completes."
  );

  return {
    indexType: EIndexType.hnsw,
    ntotal: index.cur_element_count,
    vectors: index.vectors,
    maxLevel: index.maxlevel_,
    linkLists_level0_count: index.linkLists_level0_count,
    linkLists_level_0: index.linkLists_level0,
    linkLists_levels: index.linkLists_,
    enterPoint: index.enterpoint_node_,
    labels: index.externalLabel,
    isDeleted: index.isDeleted,
    numDeleted: index.num_deleted_,
    M: index.M,
    ef_construction: index.ef_construction_,
  } as TIndexStructureHnsw;
};

const read_data_level0_memory_ = (
  reader: HNSWlibFileReader,
  index: TIndexStructureHnswDetail
) => {
  // size_data = links_level0[M0 + 1] * 4 + vector[dim * 4] * 4 + label[1] * 8;
  const isDeleted = [];
  const linkLists_level0_count = [];
  const linkLists_level0 = [];
  const vectors = [];
  const externalLabel = [];
  for (let i = 0; i < index.cur_element_count; i++) {
    linkLists_level0_count.push(reader.readLevelOCount());
    isDeleted.push(reader.readIsDeleted());
    reader.readIsReused(); // Unknown use.
    linkLists_level0.push(reader.readUint32Array(index.maxM0_));
    vectors.push(reader.readFloat32Array(index.dim));
    externalLabel.push(reader.readUint64());
    // console.log(isDeleted, linkLists_level0_count);
  }
  index.isDeleted = isDeleted;
  index.num_deleted_ = isDeleted.reduce((acc, cur) => acc + cur, 0);
  index.linkLists_level0_count = linkLists_level0_count;
  index.linkLists_level0 = linkLists_level0;
  index.vectors = vectors;
  index.externalLabel = externalLabel;
};

export default hnswlibIndexParser;
