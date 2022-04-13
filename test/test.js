import { Feder } from '../esm/index.js';
import * as d3 from 'd3';

const getId2name = async () => {
  const data = await d3.csv('./data/vectors.csv');
  const id2name = {};
  data.forEach((d, i) => (id2name[i] = d.name));
  return id2name;
};

const testHNSW = async (filePath) => {
  const container = document.querySelector('#container');

  const fileArrayBuffer = await fetch(filePath).then((res) =>
    res.arrayBuffer()
  );
  const id2name = await getId2name();
  const hoverCallback = (id) =>
    id in id2name ? `./data/images/${id2name[id]}` : null;
  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'hnswlib',
    dom: container,
    projectParams: {
      // fineWithProjection: false,
      // coarseWithProjection: false,
    },
    viewParams: {
      width: 1400,
      height: 1000,
      padding: [150, 240, 100, 280],
      itemType: 'img',
      hoverCallback,
    },
  });

  // const core = feder.core;
  // feder.overview();
  console.log(feder);
  // feder.overview();
  // feder.search(feder.core.id2vector[6341]);
};

const testIVFFlat = async () => {
  const container = document.querySelector('#container');

  const filePath = 'data/index';
  // const filePath = 'data/hnswlib_hnsw_1M.index'
  const fileArrayBuffer = await fetch(filePath).then((res) =>
    res.arrayBuffer()
  );
  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    dom: container,
    // projectMethod: 'umap',
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
};

window.addEventListener('DOMContentLoaded', async () => {
  // testIVFFlat();
  // testHNSW('data/hnswlib_hnsw_1M.index');
  testHNSW('data/hnswlib_hnsw_voc_17k.index');
});
