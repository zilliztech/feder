import { Feder } from '';
import {
  hnswIndexFilePath,
  hnswSource,
  ivfflatIndexFilePath,
  ivfflatSource,
  getRowId2imgUrl,
} from './data/dataConfig';

window.addEventListener('DOMContentLoaded', async () => {
  const testVector = Array(512)
    .fill(0)
    .map((_) => Math.random());

  const testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 4,
  };

  const mediaCallback = await getRowId2imgUrl();
  const viewParams = {
    width: 800,
    height: 480,
    projectParams: { projectSeed: 12315 },
    // mediaType: 'img',
    // mediaCallback,
    // mediaType: 'text',
    // mediaContent: (id) => `this is text content of No.${id}`,
    mediaContentCount: 6,
  };
  const domSelector = '#container';

  const ivfflatFeder = new Feder({
    source: ivfflatSource,
    filePath: ivfflatIndexFilePath,
    domSelector,
    viewParams,
  });
  ivfflatFeder.overview();
  ivfflatFeder.setSearchParams(testSearchParams).searchRandTestVec();

  const hnswFeder = new Feder({
    source: hnswSource,
    filePath: hnswIndexFilePath,
    domSelector,
    viewParams,
  });
  hnswFeder.overview();
  hnswFeder.setSearchParams(testSearchParams).searchRandTestVec();
});
