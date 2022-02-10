'use strict';
const FaissFileReader = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./FaissFileReader.js'));
const { generateArray } = require('../Utils/index.js');
const readInvertedLists = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./readInvertedLists.js'));
const readDirectMap = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./readDirectMap.js'));
const readIndexHeader = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./readIndexHeader.js'));
const { IndexHeader } = require('./faissConfig.js');
const { IndexType } = require('../Utils/config.js');

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
    index.indexType = IndexType.IVFFlat;
    readIvfHeader(reader, index);
    readInvertedLists(reader, index);
  } else if (index.h === IndexHeader.FlatIR || index.h === IndexHeader.FlatL2) {
    index.indexType = IndexType.Flat;
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

module.exports = faissIndexParser;
