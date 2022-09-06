import { getNodeIdWithLevel } from 'FederLayout/visDataHandler/hnsw/utils';
import { drawEllipses, hexWithOpacity } from 'FederView/renderUtils2D';
import HnswOverview from '.';

export default function renderNodes(this: HnswOverview) {
  const highlightNode = this.clickedNode || this.hoveredNode;
  const {
    canvasScale,
    nodeEllipseRatio,
    overviewNodesR,
    coarseNodeFill,
    coarseNodeOpacity,
    candidateNodeFill,
    candidateNodeOpacity,
    targetNodeFill,
    targetNodeOpacity,
    fineNodeFill,
    fineNodeOpacity,
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

  const neighborNodes =
    highlightNode?.links.map(
      (nodeId) =>
        this.idWithLevel2node[getNodeIdWithLevel(nodeId, highlightNode.level)]
    ) || [];
  drawEllipses({
    ctx: this.ctx,
    ellipses: neighborNodes.map((node) => [
      ...node.overviewPos,
      overviewNodesR[2] * canvasScale * nodeEllipseRatio,
      overviewNodesR[2] * canvasScale,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(targetNodeFill, targetNodeOpacity),
    shadowColor: targetNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });

  const nodesInPathFromPath =
    highlightNode?.pathFromEntry
      .map((idWithLevel) => this.idWithLevel2node[idWithLevel])
      .filter((node) => node.id !== highlightNode.id) || [];
  drawEllipses({
    ctx: this.ctx,
    ellipses: nodesInPathFromPath.map((node) => [
      ...node.overviewPos,
      overviewNodesR[3] * canvasScale * nodeEllipseRatio,
      overviewNodesR[3] * canvasScale,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(candidateNodeFill, candidateNodeOpacity),
    shadowColor: candidateNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });

  highlightNode &&
    drawEllipses({
      ctx: this.ctx,
      ellipses: [
        [
          ...highlightNode.overviewPos,
          overviewNodesR[3] * canvasScale * nodeEllipseRatio,
          overviewNodesR[3] * canvasScale,
        ],
      ],
      hasFill: true,
      fillStyle: hexWithOpacity(fineNodeFill, fineNodeOpacity),
      shadowColor: fineNodeFill,
      shadowBlur: nodeShadowBlur * canvasScale,
    });
}
