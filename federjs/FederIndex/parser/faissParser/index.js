import FaissFileReader from './FaissFileReader.js';
import readInvertedLists from './readInvertedLists.js';
import readDirectMap from './readDirectMap.js';
import readIndexHeader from './readIndexHeader.js';

import { generateArray } from 'Utils';
import { INDEX_TYPE, IndexHeader } from 'Types';

const readIvfHeader = (reader, index) => {
  readIndexHeader(reader, index);

  index.nlist = reader.readUint64();
  index.nprobe = reader.readUint64();

  index.childIndex = readIndex(reader);

  readDirectMap(reader, index);
};

const readXbVectors = (reader, index) => {
  index.codeSize = reader.readUint64();

  index.vectors = generateArray(index.ntotal).map((_) =>
    reader.readFloat32Array(index.d)
  );
};

const readIndex = (reader) => {
  const index = {};
  index.h = reader.readH();
  if (index.h === IndexHeader.IVFFlat) {
    index.indexType = INDEX_TYPE.ivf_flat;
    readIvfHeader(reader, index);
    readInvertedLists(reader, index);
  } else if (index.h === IndexHeader.FlatIR || index.h === IndexHeader.FlatL2) {
    index.indexType = INDEX_TYPE.flat;
    readIndexHeader(reader, index);
    readXbVectors(reader, index);
  } else {
    console.warn('[index type] not supported -', index.h);
  }
  return index;
};

const faissIndexParser = (arraybuffer) => {
  const faissFileReader = new FaissFileReader(arraybuffer);
  const index = readIndex(faissFileReader);
  return index;
};

export default faissIndexParser;
