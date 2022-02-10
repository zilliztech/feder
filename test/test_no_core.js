import { Feder } from '../esm/index.js';
import * as fs from 'fs';

export default function test_no_core() {
  console.log('===>\ntest_no_core');

  const filePath = 'test/data/index';
  const file = fs.readFileSync(filePath);
  const fileArrayBuffer = file.buffer;

  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    projectParams: {},
  });

  const core = feder.core;

  const { testId, testVec } = core.getTestIdAndVec();

  const searchRes = core.search(testVec);

  console.log('  search res', searchRes.fsResIds);
  console.log('  testId:', testId);
  console.assert(
    testId == searchRes.fsResIds[0],
    '  should find the original id.'
  );
}
