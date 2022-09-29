import * as d3 from 'd3';

export const isLocal = false;

export const hnswSource = 'hnswlib';
export const hnswIndexFilePath = isLocal
  ? 'data/hnswlib_hnsw_voc_17k.index'
  : 'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index';

export const ivfflatSource = 'faiss';
export const ivfflatIndexFilePath = isLocal
  ? 'data/faiss_ivf_flat_voc_17k.index'
  : 'https://assets.zilliz.com/faiss_ivf_flat_voc_17k_ab112eec72.index';

export const imgNamesFilePath =
  'https://assets.zilliz.com/voc_names_4cee9440b1.csv';

export const getRowId2name = async () => {
  const data = await d3.csv(imgNamesFilePath);
  const rowId2name = (rowId) => data[rowId].name;
  return rowId2name;
};
export const name2imgUrl = (name) =>
  `https://assets.zilliz.com/voc2012/JPEGImages/${name}`;
// export const name2imgUrl = (name) => `http://[::]:6000/${name}`;

export const getRowId2imgUrl = async () => {
  const rowId2name = await getRowId2name();
  const rowId2imgUrl = (rowId) => name2imgUrl(rowId2name(rowId));
  return rowId2imgUrl;
};

export const outputDirPath = './test/output/';
