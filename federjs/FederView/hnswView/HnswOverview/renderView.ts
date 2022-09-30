import {
  getNodeIdWithLevel,
  parseNodeIdWidthLevel,
} from 'FederLayout/visDataHandler/hnsw/utils';
import clearCanvas from 'FederView/clearCanvas';
import { TCoord, TD3Link } from 'Types';
import { vecAdd, vecMultiply } from 'Utils/distFunc';
import HnswOverview from '.';
import renderLayer from '../renderLayer';
import renderTipLine from '../renderTipLine';
import renderLinks from './renderLinks';
import renderNodes from './renderNodes';
import updateHoveredPanel from './updateHoveredPanel';

export default function renderView(this: HnswOverview) {
  clearCanvas.call(this);

  const highlightNode = this.clickedNode || this.hoveredNode;

  for (let i = 0; i < this.overviewNodesLevels.length; i++) {
    const { nodes, level } = this.overviewNodesLevels[i];

    const baseLinks =
      i > 1
        ? nodes.reduce(
            (acc, node) =>
              acc.concat(
                node.links.map((targetId) => ({
                  source: getNodeIdWithLevel(node.id, level),
                  target: getNodeIdWithLevel(targetId, level),
                }))
              ),
            [] as TD3Link[]
          )
        : [];
    const pathFromEntryLinks =
      (highlightNode?.pathFromEntry
        .map((idWithLevel, k) => {
          const [_level, id] = parseNodeIdWidthLevel(idWithLevel);
          if (k > 0 && _level === level) {
            return {
              source: highlightNode.pathFromEntry[k - 1],
              target: idWithLevel,
            };
          }
          return null;
        })
        .filter((a) => a) as TD3Link[]) || [];
    const path2NeighborLinks =
      highlightNode && level === highlightNode.level
        ? highlightNode.links.map(
            (neighborId) =>
              ({
                source: highlightNode.idWithLevel,
                target: getNodeIdWithLevel(neighborId, highlightNode.level),
              } as TD3Link)
          )
        : [];

    renderLayer.call(this, this.overviewLayerPosLevels[i]);
    renderLinks.call(this, baseLinks, pathFromEntryLinks, path2NeighborLinks);
  }

  renderNodes.call(this);

  if (!!this.hoveredNode) {
    const nodePos = this.hoveredNode.overviewPos;
    const origin = vecMultiply(
      vecAdd(
        this.overviewLayerPosLevels[0][0],
        this.overviewLayerPosLevels[0][2]
      ),
      0.5
    );
    const reverse = this.hoveredNode.overviewPos[0] < origin[0];
    const tooltipPos = renderTipLine.call(this, nodePos, reverse);
    updateHoveredPanel.call(
      this,
      vecMultiply(tooltipPos, 1 / this.viewParams.canvasScale) as TCoord,
      reverse
    );
  } else updateHoveredPanel.call(this, null);
}
