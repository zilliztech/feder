import { FederIndex } from '../../dist/index.js';
import {
  isLocal,
  ivfflatIndexFilePath,
  ivfflatSource,
  hnswIndexFilePath,
  hnswSource,
  outputDirPath,
} from '../data/dataConfig.js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function testFederIndex(source, filePath) {
  const arrayBuffer = isLocal
    ? fs.readFileSync(filePath).buffer
    : await fetch(filePath).then((res) => res.arrayBuffer());
  const federIndex = new FederIndex(source, arrayBuffer);
  const indexType = await federIndex.getIndexType();

  // indexMeta
  const indexMeta = await federIndex.getIndexMeta();

  // searchRecords
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

  // write results
  try {
    fs.accessSync(outputDirPath);
  } catch (e) {
    fs.mkdirSync(outputDirPath);
  }
  fs.writeFileSync(
    path.join(outputDirPath, `indexMeta_${indexType}.json`),
    JSON.stringify(indexMeta, null, 2)
  );
  fs.writeFileSync(
    outputDirPath + `searchRecords_${indexType}.json`,
    JSON.stringify(searchRecords, null, 2)
  );
}

await testFederIndex(ivfflatSource, path.join('test', ivfflatIndexFilePath));
await testFederIndex(hnswSource, path.join('test', hnswIndexFilePath));
