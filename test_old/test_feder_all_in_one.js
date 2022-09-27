import { Feder } from '';
import {
  hnswIndexFilePath,
  hnswSource,
  ivfflatIndexFilePath,
  ivfflatSource,
  getRowId2imgUrl,
} from './config';

const testVector = Array(512)
  .fill(0)
  .map((_) => Math.random());

const testSearchParams = {
  k: 4,
  ef: 6,
  nprobe: 4,
};

export const test_feder_all_in_one = async () => {
  const mediaCallback = await getRowId2imgUrl();
  const feder = new Feder({
    source: ivfflatSource,
    filePath: ivfflatIndexFilePath,
    domSelector: '#container',
    viewParams: {
      width: 1200,
      height: 800,
      projectParams: { projectSeed: 12315 },
      mediaType: 'text',
      mediaContent: (id) => `this is text content of No.${id}`,
      mediaContentCount: 6,
    },
  });
  feder.overview();
  const view = feder
    .setSearchParams({ nprobe: 7, k: 8 })
    .searchByRandTestVec(112);
  setTimeout(() => console.log(view.federView), 10000);
};
