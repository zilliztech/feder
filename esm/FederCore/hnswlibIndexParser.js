import HNSWlibFileReader from './HNSWlibFileReader.js';

const hnswlibIndexParser = (arrayBuffer, dim = 60) => {
  const reader = new HNSWlibFileReader(arrayBuffer);
  const index = { dim };
  index.offsetLevel0_ = reader.readUint64();
  index.max_elements_ = reader.readUint64();
  index.cur_element_count = reader.readUint64();
  index.size_data_per_element_ = reader.readUint64();
  index.label_offset_ = reader.readUint64();
  index.offsetData_ = reader.readUint64();
  index.maxlevel_ = reader.readUint32();
  index.enterpoint_node_ = reader.readUint32();
  index.maxM_ = reader.readUint64();
  index.maxM0_ = reader.readUint64();
  index.M_ = reader.readUint64();

  index.mult_ = reader.readFloat64();
  index.ef_construction_ = reader.readUint64();

  index.size_links_per_element_ = index.maxM_ * 4 + 4;
  index.size_links_level0_ = index.maxM0_ * 4 + 4;
  index.revSize_ = 1.0 / index.mult_;
  index.ef_ = 10;

  read_data_level0_memory_(reader, index);

  // index.linkListSize = reader.readUint32();

  const linkListSizes = [];
  const linkLists_ = [];
  for (let i = 0; i < index.cur_element_count; i++) {
    const linkListSize = reader.readUint32();
    linkListSizes.push(linkListSize);
    linkLists_[i] =
      linkListSize === 0 ? [] : reader.readUint32Array(linkListSize / 4);
  }
  index.linkListSizes = linkListSizes;
  index.linkLists_ = linkLists_;

  console.log('index', index);
  console.log('isEmpty', reader.isEmpty);
  return '';
};

const read_data_level0_memory_ = (reader, index) => {
  // reader.p += index.cur_element_count * index.size_data_per_element_;
  const linkLists_level0 = [];
  const vectors = [];
  const externalLabel = [];
  for (let i = 0; i < index.cur_element_count; i++) {
    linkLists_level0.push(reader.readUint32Array(index.size_links_level0_ / 4));
    vectors.push(reader.readFloat32Array(index.dim));
    externalLabel.push(reader.readUint64());
  }
  index.linkLists_level0 = linkLists_level0;
  index.vectors = vectors;
  index.externalLabel = externalLabel;
};

export default hnswlibIndexParser;
