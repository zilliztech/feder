import { Feder } from '../esm/index.js';
// import { Feder } from '@zilliz/feder';
import * as d3 from 'd3';

const domSelector = '#container';

const testHNSW = async (filePath) => {
  const feder = new Feder({
    filePath,
    source: 'hnswlib',
    domSelector,
  });
  return feder;
};

const getId2name = async () => {
  const data = await d3.csv(
    'https://assets.zilliz.com/voc_vectors_e8ec5a5eae.csv'
  );
  const rowId2name = {};
  data.forEach((d, i) => (rowId2name[i] = d.name));
  return rowId2name;
};

const testHNSWWithImages = async (filePath) => {
  const rowId2name = await getId2name();
  const mediaCallback = (rowId) =>
    rowId in rowId2name
      ? `https://assets.zilliz.com/voc2012/JPEGImages/${rowId2name[rowId]}`
      : null;
  const feder = new Feder({
    filePath,
    source: 'hnswlib',
    domSelector,
    viewParams: {
      mediaType: 'img',
      mediaCallback,
    },
  });
  return feder;
};

const testIVFFlat = async (filePath) => {
  const feder = new Feder({
    filePath,
    source: 'faiss',
    domSelector,
    projectParams: {
      // fineWithProjection: false,
      // coarseWithProjection: false,
    },
    viewParams: {
      width: 1100,
      height: 1000,
    },
  });
  return feder;
};

window.addEventListener('DOMContentLoaded', async () => {
  // const feder = await testIVFFlat('data/faiss_ivf_flat.index');
  // const feder = await testHNSW('data/hnswlib_hnsw_random_1M.index');
  const feder = await testHNSW(
    'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index'
  );
  // const feder = await testHNSWWithImages(
  //   'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index'
  // );
  console.log(feder);
  // feder.overview();
  feder.searchRandTestVec();
});
