import { Feder } from '../esm/index.js';
import * as d3 from 'd3';

const getId2name = async () => {
  const data = await d3.csv('./data/voc_vectors.csv');
  const rowId2name = {};
  data.forEach((d, i) => (rowId2name[i] = d.name));
  return rowId2name;
};

const domSelector = '#container';

const testHNSW = async (filePath) => {
  const rowId2name = await getId2name();
  const mediaCallback = (rowId) =>
    rowId in rowId2name ? `./data/images/${rowId2name[rowId]}` : null;
  const feder = new Feder({
    filePath,
    source: 'hnswlib',
    domSelector,
    viewParams: {
      mediaType: 'img',
      mediaCallback,
    },
  });

  console.log(feder);
  feder.overview();
  // feder.search(feder.core.id2vector[6341]);
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

  // const core = feder.core;
  // feder.overview();
  console.log(feder);
  feder.overview();
  // feder.search(feder.core.id2vector[6341]);
};

window.addEventListener('DOMContentLoaded', async () => {
  // testIVFFlat('data/faiss_ivf_flat.index');
  // testHNSW('data/hnswlib_hnsw_random_1M.index');
  testHNSW('data/hnswlib_hnsw_voc_17k.index');
});
