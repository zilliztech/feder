import { drawEllipses, hexWithOpacity } from 'FederView/renderUtils2D';
import { EHnswNodeType } from 'Types';
import { TVisDataHnswNode } from 'Types/visData';
import HnswSearchView from '.';

export default function renderNodes(
  this: HnswSearchView,
  nodes: TVisDataHnswNode[],
  level: number
) {
  const {
    canvasScale,
    nodeEllipseRatio,
    nodeShadowBlur,
    coarseNodeFill,
    coarseNodeOpacity,
    candidateNodeFill,
    candidateNodeOpacity,
    fineNodeFill,
    fineNodeOpacity,
  } = this.viewParams;
  // coarse
  const coarseNodes = nodes.filter(
    (node) => node.type === EHnswNodeType.Coarse
  );
  drawEllipses({
    ctx: this.ctx,
    ellipses: coarseNodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * nodeEllipseRatio,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(coarseNodeFill, coarseNodeOpacity),
    shadowColor: coarseNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });

  // candidate
  const candidateNodes = nodes.filter(
    (node) => node.type === EHnswNodeType.Candidate
  );
  drawEllipses({
    ctx: this.ctx,
    ellipses: candidateNodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * nodeEllipseRatio,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(candidateNodeFill, candidateNodeOpacity),
    shadowColor: candidateNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });

  // fine
  const fineNodes = nodes.filter((node) => node.type === EHnswNodeType.Fine);
  drawEllipses({
    ctx: this.ctx,
    ellipses: fineNodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * nodeEllipseRatio,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(fineNodeFill, fineNodeOpacity),
    shadowColor: fineNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });
}
