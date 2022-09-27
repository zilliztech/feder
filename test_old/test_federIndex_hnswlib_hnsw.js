import { FederIndex } from '../dist/index.js';
import fs from 'fs';
import { hnswIndexFilePath, hnswSource, outputDirPath } from './config.js';
import path from 'path';

export async function test_federIndex_hnswlib_hnsw() {
  const federIndex = new FederIndex(hnswSource);

  const arrayBuffer = fs.readFileSync(path.join("./test", hnswIndexFilePath)).buffer;
  federIndex.initByArrayBuffer(arrayBuffer);

  await test_getIndexMeta(federIndex);
  await test_getSearchRecords(federIndex);
}

const test_getIndexMeta = async (federIndex) => {
  const indexMeta = await federIndex.getIndexMeta();
  fs.writeFileSync(
    outputDirPath + 'FederIndex_hnswlib_hnsw_indexMeta.json',
    JSON.stringify(indexMeta, null, 2)
  );
};

const test_getSearchRecords = async (federIndex) => {
  const testVector = Array(512)
    .fill(0)
    .map((_) => Math.random());

  const testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 5,
  };
  const searchRecords = await federIndex.getSearchRecords(
    testVector,
    testSearchParams
  );
  fs.writeFileSync(
    outputDirPath + 'FederIndex_hnswlib_hnsw_searchRecords.json',
    JSON.stringify(searchRecords, null, 2)
  );
};
