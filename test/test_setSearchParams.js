import { Feder } from '../esm/index.js';
import * as fs from 'fs';

export default function test_setSearchParams() {
  console.log('===>\ntest_setSearchParams');

  const filePath = 'test/data/index';
  const file = fs.readFileSync(filePath);
  const fileArrayBuffer = file.buffer;

  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    projectParams: {},
  });

  // const core = feder.core;

  const { testId, testVec } = feder.getTestIdAndVec();
  console.log('testId', testId);

  const test_searchParams = { nprobe: 6, k: 9 };
  console.log('search params:,', test_searchParams);
  feder.setSearchParams(test_searchParams);

  const res = feder.search(testVec);
  console.log('search res', res.csResIds.length, res.fsResIds.length);
}
