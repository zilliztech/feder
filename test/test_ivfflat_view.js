import { Feder } from '../esm/index.js';
import * as fs from 'fs';

export default function test_ivfflat_view() {
  console.log('===>\ntest_ivfflat_view');

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

  const res = feder.search(testVec);
  console.log('search res', Object.keys(res), res.csResIds, res.fsResIds);
}
