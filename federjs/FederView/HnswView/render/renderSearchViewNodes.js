import {
  drawEllipse,
  hexWithOpacity,
  ZBlue,
  ZYellow,
  ZOrange,
  colorScheme,
} from 'Utils/renderUtils';

import { HNSW_NODE_TYPE } from 'Types';

export default function renderSearchViewNodes(
  ctx,
  { nodes, level },
  { ellipseRation, shadowBlur }
) {
  let _nodes = [];

  // coarse
  _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Coarse);
  drawEllipse({
    ctx,
    circles: _nodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * ellipseRation,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(ZBlue, 0.7),
    shadowColor: ZBlue,
    shadowBlur,
  });

  // candidate
  _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Candidate);
  drawEllipse({
    ctx,
    circles: _nodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * ellipseRation,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(ZYellow, 0.8),
    shadowColor: ZYellow,
    shadowBlur,
  });

  // fine
  _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Fine);
  drawEllipse({
    ctx,
    circles: _nodes.map((node) => [
      ...node.searchViewPosLevels[level],
      node.r * ellipseRation,
      node.r,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(colorScheme[2], 1),
    hasStroke: true,
    lineWidth: 1,
    strokeStyle: hexWithOpacity(ZOrange, 0.8),
    shadowColor: ZOrange,
    shadowBlur,
  });
}
