import { Feder } from '../esm/index.js';
import * as d3 from 'd3';

const getId2name = async () => {
  const data = await d3.csv('./data/voc_vectors.csv');
  const id2name = {};
  data.forEach((d, i) => (id2name[i] = d.name));
  return id2name;
};

const domSelector = '#container';

const testHNSW = async (filePath) => {
  const id2name = await getId2name();
  const mediaCallback = (id) =>
    id in id2name ? `./data/images/${id2name[id]}` : null;
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
  const container = document.querySelector('#container');
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
  testHNSW('data/hnswlib_hnsw_random_1M.index');
  // testHNSW('data/hnswlib_hnsw_voc_17k.index');
});
