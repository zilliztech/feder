import { getRowId2imgUrl } from './config.js';
import { Feder } from '';

const url = 'http://localhost';
const port = 1332;
const coreUrl = `${url}:${port}`;

const domSelector = '#container';

window.addEventListener('DOMContentLoaded', async () => {
  const rowId2imgUrl = await getRowId2imgUrl();

  const feder = new Feder({
    coreUrl,
    viewParams: {
      mediaType: 'img',
      mediaCallback: rowId2imgUrl,
    },
  });

  document.querySelector(domSelector).appendChild(feder.overview());
  // select the specified vector as the target
  document
    .querySelector(domSelector)
    .appendChild(
      feder.setSearchParams({ k: 9, nprobe: 8, ef: 6 }).searchById(14383)
    );
  // random select
  document
    .querySelector(domSelector)
    .appendChild(
      feder.setSearchParams({ k: 12, nprobe: 10, ef: 8 }).searchRandTestVec()
    );
});
