import { FederIndex, FederLayout, FederView } from '';
import {
  hnswIndexFilePath,
  hnswSource,
  ivfflatIndexFilePath,
  ivfflatSource,
} from './config';

const testVector = Array(512)
  .fill(0)
  .map((_) => Math.random());

const testSearchParams = {
  k: 4,
  ef: 6,
  nprobe: 4,
};

window.addEventListener('DOMContentLoaded', async () => {
  const arrayBuffer = await fetch(ivfflatIndexFilePath).then((res) =>
    res.arrayBuffer()
  );

  const federIndex = new FederIndex(ivfflatSource);

  federIndex.initByArrayBuffer(arrayBuffer);

  // console.log('federIndex', federIndex);

  const federLayout = new FederLayout(federIndex);

  // const visData = await federLayout.getVisData({
  //   actionType: 'overview',
  //   viewType: "normal",
  // })

  const visDataAll = await federLayout.getVisData({
    actionType: 'search', // 'overview' | 'search'
    actionData: {
      target: testVector,
      searchParams: testSearchParams,
    },
    // viewType: 'default' | 'default'
    viewType: 'default',
    layoutParams: {},
  });

  console.log('visDataAll', visDataAll);

  const viewParams = {};
  const federView = new FederView(visDataAll, viewParams);
  console.log('federView', federView);

  document.querySelector('#container').appendChild(federView.node);
  federView.render();
});
