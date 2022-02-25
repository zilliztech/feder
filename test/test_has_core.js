import { Feder, FederCore } from '../esm/index.js';
import * as fs from 'fs';

export default function test_has_core() {
  console.log('===>\ntest_has_core');

  const filePath = 'test/data/index';
  const file = fs.readFileSync(filePath);
  const fileArrayBuffer = file.buffer;

  let core = new FederCore({
    data: fileArrayBuffer,
    source: 'faiss',
    projectParams: {},
  });

  const feder = new Feder({ core });
  core = feder.core;

  const { testId, testVec } = core.getTestIdAndVec();

  const searchRes = core.search(testVec);

  console.log('  search res', searchRes.fsResIds);
  console.log('  testId:', testId);
  console.assert(
    testId == searchRes.fsResIds[0],
    '  should find the original id.'
  );
}
