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
  invlists.listSizes = Array(invlists.listSizesSize)
    .fill(0)
    .map((_) => reader.readUint64());

  const data = [];
  for (let i = 0; i < invlists.listSizesSize; i++) {
    const vectors = Array(invlists.listSizes[i])
      .fill(0)
      .map((_) => reader.readFloat32Array(invlists.codeSize / 4));
    const ids = reader.readUint64Array(invlists.listSizes[i]);
    data.push({ ids, vectors });
  }
  invlists.data = data;
};

export const readInvertedLists = (reader, index) => {
  const invlists = {} as any;
  invlists.h = reader.readH();
  checkInvH(invlists.h);
  invlists.nlist = reader.readUint64();
  invlists.codeSize = reader.readUint64();

  readArrayInvLists(reader, invlists);

  index.invlists = invlists;
};

export default readInvertedLists;
