import { Feder } from '../esm/index.js';

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#container');

  const filePath = 'data/index';
  const fileArrayBuffer = await fetch(filePath).then((res) =>
    res.arrayBuffer()
  );
  const feder = new Feder({
    data: fileArrayBuffer,
    source: 'faiss',
    dom: container,
    // projectMethod: 'umap',
    projectParams: {
      // fineWithProjection: false,
      // coarseWithProjection: false,
    },
    viewParams: {
      width: 1400,
      height: 1000,
    },
  });

  // const core = feder.core;
  // feder.overview();
  console.log(feder);

  // const { testId, testVec } = feder.getTestIdAndVec();
  // console.log('testId', testId);

  // const res = feder.search(testVec);
  // console.log('search res', Object.keys(res), res.csResIds, res.fsResIds);
});
