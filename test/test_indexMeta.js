import { Feder } from '../esm/index.js';
import * as fs from 'fs';

export default function test_indexMeta() {
  console.log('===>\ntest_indexMeta');
  
  const filePath = 'test/data/index';
  const file = fs.readFileSync(filePath);
  const fileArrayBuffer = file.buffer;

  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    projectParams: {},
  });

  const core = feder.core;

  console.log(Object.keys(core.indexMeta));
}
