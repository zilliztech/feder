import FaissFileReader from './FaissFileReader';
import readInvertedLists from './readInvertedLists';
import readDirectMap from './readDirectMap';
import readIndexHeader from './readIndexHeader';

import { EIndexType } from 'Types';
import {
  EFaissIndexHeader,
  TIndexStructureIvfflat,
} from 'Types/indexStructure';

const readIvfHeader = (reader, index) => {
  readIndexHeader(reader, index);

  index.nlist = reader.readUint64();
  index.nprobe = reader.readUint64();

  index.childIndex = readIndex(reader);

  readDirectMap(reader, index);
};

const readXbVectors = (reader, index) => {
  index.codeSize = reader.readUint64();

  index.vectors = Array(index.ntotal)
    .fill(0)
    .map((_) => reader.readFloat32Array(index.d));
};

const readIndex = (reader) => {
  const index = {} as any;
  index.h = reader.readH();
  if (index.h === EFaissIndexHeader.ivfflat) {
    index.indexType = EIndexType.ivfflat;
    readIvfHeader(reader, index);
    readInvertedLists(reader, index);
  } else if (
    index.h === EFaissIndexHeader.flatIR ||
    index.h === EFaissIndexHeader.flatL2
  ) {
    index.indexType = EIndexType.flat;
    readIndexHeader(reader, index);
    readXbVectors(reader, index);
  } else {
    console.warn('[index type] not supported -', index.h);
  }
  return index;
};

export const faissIndexParser = (arraybuffer: ArrayBuffer) => {
  const faissFileReader = new FaissFileReader(arraybuffer);
  const index = readIndex(faissFileReader);
  return index as TIndexStructureIvfflat;
};
