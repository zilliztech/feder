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
  const rowId2imgUrl = await getRowId2imgUrl();

  const faissIvfflatArrayBuffer = await fetch(ivfflatIndexFilePath).then(
    (res) => res.arrayBuffer()
  );
  const ivfflatFederIndex = new FederIndex(
    ivfflatSource,
    faissIvfflatArrayBuffer
  );
  const ivfflatFederLayout = new FederLayout(ivfflatFederIndex);

  const ivfflatViewParams = {
    mediaType: 'image',
    mediaContent: rowId2imgUrl,
    getVectorById: (id) => ivfflatFederIndex.getVectorById(id),
  };
  const ivfflatOverviewVisData = await ivfflatFederLayout.getVisData({
    actionType: 'overview',
  });
  const ivfflatOverview = new FederView(
    ivfflatOverviewVisData,
    ivfflatViewParams
  );
  ivfflatOverview.render();
  document.querySelector('#container').appendChild(ivfflatOverview.node);

  const ivfflatSearchVisData = await ivfflatFederLayout.getVisData({
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
  const ivfflatSearchView = new FederView(
    ivfflatSearchVisData,
    ivfflatViewParams
  );
  ivfflatSearchView.render();
  document.querySelector('#container').appendChild(ivfflatSearchView.node);

  const hnswlibHnswArrayBuffer = await fetch(hnswIndexFilePath).then((res) =>
    res.arrayBuffer()
  );
  const hnswFederIndex = new FederIndex(hnswSource, hnswlibHnswArrayBuffer);
  const hnswFederLayout = new FederLayout(hnswFederIndex);

  const hnswViewParams = {
    mediaType: 'image',
    mediaContent: rowId2imgUrl,
    getVectorById: (id) => hnswFederIndex.getVectorById(id),
  };
  const hnswOverviewVisData = await hnswFederLayout.getVisData({
    actionType: 'overview',
  });
  const hnswOverview = new FederView(hnswOverviewVisData, hnswViewParams);
  hnswOverview.render();
  document.querySelector('#container').appendChild(hnswOverview.node);

  const hnswSearchVisData = await hnswFederLayout.getVisData({
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
  const hnswSearchView = new FederView(hnswSearchVisData, hnswViewParams);
  hnswSearchView.render();
  document.querySelector('#container').appendChild(hnswSearchView.node);
});
