import * as d3 from 'd3';
import { dist2 } from 'Utils';

export default function mouse2node({
  mouse,
  mouse2nodeBias,
  canvasScale,
  layerPosLevels,
  nodesLevels,
  posAttr,
}) {
  const mouseLevel = layerPosLevels.findIndex((points) =>
    d3.polygonContains(points, mouse)
  );
  let mouseNode;
  if (mouseLevel >= 0) {
    const allDis = nodesLevels[mouseLevel].map((node) =>
      dist2(node[posAttr][mouseLevel], mouse)
    );
    const minDistIndex = d3.minIndex(allDis);
    const minDist = allDis[minDistIndex];
    const clearestNode = nodesLevels[mouseLevel][minDistIndex];
    mouseNode =
      minDist < Math.pow((clearestNode.r + mouse2nodeBias) * canvasScale, 2)
        ? clearestNode
        : null;
  } else {
    mouseNode = null;
  }
  return { mouseLevel, mouseNode };
}
