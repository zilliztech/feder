import { FederIndex } from '../dist/index.js';
import fetch from 'node-fetch';
import { ivfflatIndexFilePath, ivfflatSource } from './config.js';

export async function test_federIndex_faiss_ivfflat() {
  const federIndex = new FederIndex(ivfflatSource);

  const arrayBuffer = await fetch(ivfflatIndexFilePath).then((res) =>
    res.arrayBuffer()
  );
  federIndex.initByArrayBuffer(arrayBuffer);

  console.log(await federIndex.getIndexMeta());

  await test_getIndexMeta(federIndex);
  await test_getSearchRecords(federIndex);
}

const test_getIndexMeta = async (federIndex) => {
  console.log(await federIndex.getIndexMeta());
};

const test_getSearchRecords = async (federIndex) => {
  const testVector = Array(512)
    .fill(0)
    .map((_) => Math.random());

  const testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 4,
  };
  console.log(await federIndex.getSearchRecords(testVector, testSearchParams));
};
