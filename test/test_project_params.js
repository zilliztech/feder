import { Feder } from '../esm/index.js';
import * as fs from 'fs';

export default function test_project_params() {
  console.log('===>\ntest_project_params');
  
  const filePath = 'test/data/index';
  const file = fs.readFileSync(filePath);
  const fileArrayBuffer = file.buffer;

  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    projectParams: {},
  });

  const core = feder.core;

  // default umap
  console.log(core.indexMeta.listCentroidProjections.slice(0, 4));
  core.setProjectParams('tsne');
  console.log(core.indexMeta.listCentroidProjections.slice(0, 4));
}
