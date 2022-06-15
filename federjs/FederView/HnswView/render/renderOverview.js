import renderBackground from './renderBackground';
import renderlevelLayer from './renderlevelLayer';
import renderLinks from './renderLinks';
import renderNodes from './renderNodes';
import renderReachable from './renderReachable';
import renderShortestPath from './renderShortestPath';

export default function renderOverview(ctx, federView, overviewHighlightData) {
  const {
    overviewLevelCount,
    overviewNodesLevels,
    overviewLinksLevels,
    overviewLayerPosLevels,
  } = federView;
  renderBackground(ctx, federView);
  for (let level = 0; level < overviewLevelCount; level++) {
    renderlevelLayer(ctx, overviewLayerPosLevels[level], federView);
    const nodes = overviewNodesLevels[level];
    const links = overviewLinksLevels[level];
    level > 0 && renderLinks(ctx, links, level, federView);
    renderNodes(ctx, nodes, level, federView);

    if (overviewHighlightData) {
      renderReachable(ctx, level, overviewHighlightData, federView);
      renderShortestPath(ctx, level, overviewHighlightData, federView);
    }
  }
}
