import renderBackground from './renderBackground';
import renderlevelLayer from './renderlevelLayer';
import renderLinks from './renderLinks';
import renderNodes from './renderNodes';
import renderReachable from './renderReachable';
import renderShortestPath from './renderShortestPath';

export default function renderOverview() {
  renderBackground(this);
  for (let level = 0; level < this.overviewLevelCount; level++) {
    renderlevelLayer({
      ...this,
      points: this.overviewLayerPosLevels[level],
    });
    const nodes = this.overviewNodesLevels[level];
    const links = this.overviewLinksLevels[level];
    level > 0 && renderLinks({ ...this, links, level });
    renderNodes({ ...this, nodes, level });

    const isActive = this.clickedNode || this.hoveredNode;
    isActive &&
      renderReachable({ ...this, level, posAttr: 'overviewPosLevels' });
    isActive &&
      renderShortestPath({ ...this, level, posAttr: 'overviewPosLevels' });
  }
}
