// import { Feder } from '../esm/index.js';
import { Feder } from '';
// import { Feder } from '../dist/index.js';
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
    'https://assets.zilliz.com/voc_names_4cee9440b1.csv'
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
    viewParams: {},
  });
  return feder;
};

const testIVFFlatWithImages = async (filePath) => {
  const rowId2name = await getId2name();
  const mediaCallback = (rowId) =>
    rowId in rowId2name
      ? `https://assets.zilliz.com/voc2012/JPEGImages/${rowId2name[rowId]}`
      : null;
  // const mediaCallback = (rowId) => {
  //   if (rowId in rowId2name)
  //     return `https://assets.zilliz.com/voc2012/JPEGImages/${rowId2name[rowId]}`;
  //   else {
  //     console.log(rowId);
  //     return null;
  //   }
  // };
  const feder = new Feder({
    filePath,
    source: 'faiss',
    domSelector,
    projectParams: {
      // fineWithProjection: false,
      // coarseWithProjection: false,
    },
    viewParams: {
      mediaType: 'img',
      mediaCallback,
    },
  });
  return feder;
};

window.addEventListener('DOMContentLoaded', async () => {
  // const feder = await testIVFFlat('data/faiss_ivf_flat.index');
  const feder = await testIVFFlatWithImages(
    'https://assets.zilliz.com/faiss_ivf_flat_voc_17k_ab112eec72.index'
  );
  // const feder = await testHNSW('data/hnswlib_hnsw_random_1M.index');
  // const feder = await testHNSW(
  //   'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index'
  // );
  // const feder = await testHNSWWithImages(
  //   'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index'
  // );
  console.log(feder);
  // feder.overview();
  feder.setSearchParams({
    k: 15,
    nprobe: 12,
    fineSearchWithProjection: true,
    projectMethod: 'umap',
  });
  feder.searchRandTestVec();
});
