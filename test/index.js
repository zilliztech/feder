import { FederIndex, FederLayout, FederView } from '';

const hnswIndexFile =
  'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index';

const testVector = Array(512)
  .fill(0)
  .map((_) => Math.random());

const testSearchParams = {
  k: 4,
  ef: 6,
  nprobe: 4,
};

window.addEventListener('DOMContentLoaded', async () => {
  const arrayBuffer = await fetch(hnswIndexFile).then((res) =>
    res.arrayBuffer()
  );

  const federIndex = new FederIndex('hnsw');

  federIndex.initByArrayBuffer(arrayBuffer);

  // console.log('federIndex', federIndex);

  const federLayout = new FederLayout(federIndex);

  // const visData = await federLayout.getVisData({
  //   actionType: 'overview',
  //   viewType: "normal",
  // })

  const visDataAll = await federLayout.getVisData({
    actionType: 'search', // 'overview'
    actionData: {
      target: testVector,
      searchParams: testSearchParams,
    },
    viewType: 'normal',
    // viewType: 'hnsw3d',
  });

  console.log('visDataAll', visDataAll);

  const federView = new FederView(visDataAll);

  // document.querySelector('#container').appendChild(federView.node);
});
