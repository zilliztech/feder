import { getFederHnswLite, getFederHnsw } from './testHnsw';
import { getFederIvfflatLite, getFederIvfflat } from './testIvfflat';
import * as d3 from 'd3';

const domSelector = '#container';
window.addEventListener('DOMContentLoaded', async () => {
  // const hnsw_feder = getFederHnswLite();  // without images mapping.
  const hnsw_feder = await getFederHnsw();

  document.querySelector(domSelector).appendChild(hnsw_feder.overview());

  // randomly select an internal vector as the target
  document
    .querySelector(domSelector)
    .appendChild(
      hnsw_feder.setSearchParams({ k: 6, nprobe: 8, ef: 9 }).searchRandTestVec()
    );

  // const ivfflat_feder = getFederIvfflatLite();  // without images mapping.
  const ivfflat_feder = await getFederIvfflat();

  document.querySelector(domSelector).appendChild(ivfflat_feder.overview());
  // select the No.4365 vector as the target
  document
    .querySelector(domSelector)
    .appendChild(
      ivfflat_feder
        .setSearchParams({ k: 9, nprobe: 8, ef: 6 })
        .searchById(14383)
    );
});
