import { generateArray } from '../Utils/index.js';

const checkInvH = (h) => {
  if (h !== 'ilar') {
    console.warn('[invlists h] not ilar.', h);
  }
};

const checkInvListType = (listType) => {
  if (listType !== 'full') {
    console.warn('[inverted_lists list_type] only support full.', listType);
  }
};

const readArrayInvLists = (reader, invlists) => {
  invlists.listType = reader.readH();
  checkInvListType(invlists.listType);

  invlists.listSizesSize = reader.readUint64();
  invlists.listSizes = generateArray(invlists.listSizesSize).map((_) =>
    reader.readUint64()
  );

  const vectors = [];
  const ids = [];

  generateArray(invlists.listSizesSize).forEach((_, i) => {
    vectors.push(
      generateArray(invlists.listSizes[i]).map((_) =>
        reader.readFloat32Array(invlists.codeSize / 4)
      )
    );
    ids.push(reader.readUint64Array(invlists.listSizes[i]));
  });
  invlists.ids = ids;
  invlists.vector = vectors;
};

export const readInvertedLists = (reader) => {
  const invlists = {};
  invlists.h = reader.readH();
  checkInvH(invlists.h);
  invlists.nlist = reader.readUint64();
  invlists.codeSize = reader.readUint64();

  readArrayInvLists(reader, invlists);

  return invlists;
};

export default readInvertedLists;
