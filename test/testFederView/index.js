import { FederView } from './lib/index.js';

async function getFederView(indexType, action) {
  const visData = await fetch(`./data/${action}VisData_${indexType}.json`).then(
    (res) => res.json()
  );
  const federView = new FederView(visData);
  return federView;
}

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#container');

  const ivfflatOverview = await getFederView('ivfflat', 'overview');
  container.appendChild(ivfflatOverview.node);
  ivfflatOverview.render();

  const ivfflatSearchView = await getFederView('ivfflat', 'search');
  container.appendChild(ivfflatSearchView.node);
  ivfflatSearchView.render();

  const hnswOverview = await getFederView('hnsw', 'overview');
  container.appendChild(hnswOverview.node);
  hnswOverview.render();

  const hnswSearchView = await getFederView('hnsw', 'search');
  container.appendChild(hnswSearchView.node);
  hnswSearchView.render();
});
