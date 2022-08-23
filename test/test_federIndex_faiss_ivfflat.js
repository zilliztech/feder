import { FederIndex } from '../dist/index.js';
import {
  ivfflatIndexFilePath,
  ivfflatSource,
  outputDirPath,
} from './config.js';
import fs from 'fs';

export async function test_federIndex_faiss_ivfflat() {
  const federIndex = new FederIndex(ivfflatSource);

  const arrayBuffer = fs.readFileSync(ivfflatIndexFilePath).buffer;
  federIndex.initByArrayBuffer(arrayBuffer);

  await test_getIndexMeta(federIndex);
  await test_getSearchRecords(federIndex);
}

const test_getIndexMeta = async (federIndex) => {
  const indexMeta = await federIndex.getIndexMeta();
  fs.writeFileSync(
    outputDirPath + 'FederIndex_faiss_ivfflat_indexMeta.json',
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
    outputDirPath + 'FederIndex_faiss_ivfflat_searchRecords.json',
    JSON.stringify(searchRecords, null, 2)
  );
};
