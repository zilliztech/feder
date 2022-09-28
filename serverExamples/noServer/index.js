import { Feder } from 'https://unpkg.com/@zilliz/feder';
// import { Feder } from '@zilliz/feder';

window.addEventListener('DOMContentLoaded', () => {
  const feder = new Feder({
    source: 'hnswlib',
    filePath:
      'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index',
    domSelector: '#container',
    viewParams: {
      width: 800,
      height: 400,
    },
  });
  feder.overview();
  feder.searchRandTestVec();
});
