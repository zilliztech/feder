import { FederIndex, FederLayout, FederView } from '';
import {
  hnswIndexFilePath,
  hnswSource,
  ivfflatIndexFilePath,
  ivfflatSource,
  getRowId2imgUrl,
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
  const arrayBuffer = await fetch(hnswIndexFilePath).then((res) =>
    res.arrayBuffer()
  );

  const rowId2imgUrl = await getRowId2imgUrl();

  const federIndex = new FederIndex(hnswSource);

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
      targetMedia: rowId2imgUrl(12345),
      searchParams: testSearchParams,
    },
    // viewType: 'default' | 'default'
    viewType: 'default',
    layoutParams: {},
  });

  console.log('visDataAll', visDataAll);

  const viewParams = {
    mediaType: 'image',
    mediaContent: rowId2imgUrl,
  };
  const federView = new FederView(visDataAll, viewParams);
  console.log('federView', federView);

  document.querySelector('#container').appendChild(federView.node);
  federView.render();
});
