import { drawEllipses, hexWithOpacity } from 'FederView/renderUtils2D';
import HnswOverview from '.';

export default function renderNodes(this: HnswOverview) {
  const {
    canvasScale,
    nodeEllipseRatio,
    overviewNodesR,
    coarseNodeFill,
    coarseNodeOpacity,
    nodeShadowBlur,
  } = this.viewParams;
  this.overviewNodesLevels.forEach(({ nodes }, i) => {
    drawEllipses({
      ctx: this.ctx,
      ellipses: nodes.map((node) => [
        ...node.overviewPos,
        overviewNodesR[i] * canvasScale * nodeEllipseRatio,
        overviewNodesR[i] * canvasScale,
      ]),
      hasFill: true,
      fillStyle: hexWithOpacity(coarseNodeFill, coarseNodeOpacity),
      shadowColor: coarseNodeFill,
      shadowBlur: nodeShadowBlur * canvasScale,
    });
  });
}
