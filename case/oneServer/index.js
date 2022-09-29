import { FederView } from 'https://unpkg.com/@zilliz/feder';
import {
  federIndexLayoutUrl,
  federIndexFuncs,
  federLayoutFuncs,
} from './config.js';

const requestData = (url, path, params = {}) => {
  return fetch(
    url +
      '/' +
      path +
      '?' +
      new URLSearchParams({ params: JSON.stringify(params) })
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'succeed') return res.data;
      else throw new Error(`Wrong: ${path}`);
    });
};

const federIndex = {
  [federIndexFuncs.getVectorById]: (id) =>
    requestData(federIndexLayoutUrl, federIndexFuncs.getVectorById, { id }),
};

const federLayout = {
  [federLayoutFuncs.getVisData]: (params) =>
    requestData(federIndexLayoutUrl, federLayoutFuncs.getVisData, params),
};

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#container');

  const viewParams = {
    // mediaType: 'image',
    // mediaContent: rowId2imgUrl,
    // width: 1000,
    // height: 1000,
    mediaType: 'text',
    mediaContent: (id) => `this is content of No.${id}`,
    mediaContentCount: 5,
  };
  const visDataOverview = await federLayout.getVisData({
    actionType: 'overview',
    layoutParams: viewParams,
  });
  const overview = new FederView(visDataOverview, viewParams);
  overview.render();
  container.appendChild(overview.node);

  const targetId = 1492;
  const target = await federIndex.getVectorById(targetId);
  const targetMedia = 'this is the content of the target.';
  const visDataSearchView = await federLayout.getVisData({
    actionType: 'search',
    actionData: {
      target,
      targetMedia,
      searchParams: { nprobe: 7, k: 5 },
    },
    layoutParams: viewParams,
  });
  const searchView = new FederView(visDataSearchView, viewParams);
  searchView.render();
  container.appendChild(searchView.node);
});
