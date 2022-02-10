'use strict';
const { generateArray } = require('../Utils/index.js');

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

  const data = [];
  generateArray(invlists.listSizesSize).forEach((_, i) => {
    const vectors = generateArray(invlists.listSizes[i]).map((_) =>
      reader.readFloat32Array(invlists.codeSize / 4)
    );
    const ids = reader.readUint64Array(invlists.listSizes[i]);
    data.push({ ids, vectors });
  });
  invlists.data = data;
};

const readInvertedLists = (reader, index) => {
  const invlists = {};
  invlists.h = reader.readH();
  checkInvH(invlists.h);
  invlists.nlist = reader.readUint64();
  invlists.codeSize = reader.readUint64();

  readArrayInvLists(reader, invlists);

  index.invlists = invlists;
};
exports.readInvertedLists = readInvertedLists;

module.exports = readInvertedLists;
