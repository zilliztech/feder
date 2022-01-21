import FaissFileReader from './FaissFileReader.js';
import { generateArray } from '../Utils/index.js';
import readInvertedLists from './readInvertedLists.js';
import readDirectMap from './readDirectMap.js';
import readIndexHeader from './readIndexHeader.js';

const readIvfHeader = (reader, index) => {
  readIndexHeader(reader, index);

  index.nlist = reader.readUint64();
  index.nprobe = reader.readUint64();

  index.childIndex = readIndex(reader);

  index.directMap = readDirectMap(reader);
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
  if (index.h === 'IwFl') {
    readIvfHeader(reader, index);
    index.invlists = readInvertedLists(reader);
  } else if (index.h === 'IxF2' || index.h === 'IxFI') {
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
