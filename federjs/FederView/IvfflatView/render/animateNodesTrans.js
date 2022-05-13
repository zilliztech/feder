import { SEARCH_VIEW_TYPE } from 'Types';
import { hexWithOpacity, drawCircle, whiteColor } from 'Utils/renderUtils';

export default function animateNodesTrans({
  ctx,
  colorScheme,
  ease,
  elapsed,
  duration,
  delay,
  newSearchViewType,
  nonTopKNodes,
  nonTopKNodeR,
  canvasScale,
  topKNodes,
  topKNodeR,
  topKNodeStrokeWidth,
  nprobe,
  nonTopKNodeOpacity,
  topKNodeOpacity,
}) {
  let t = ease((elapsed - delay) / duration);
  if (t > 1 || t < 0) return;

  t = newSearchViewType === SEARCH_VIEW_TYPE.polar ? 1 - t : t;

  const nonTopKCircles = nonTopKNodes.map((node) => [
    t * node.projectPos[0] + (1 - t) * node.polarPos[0],
    t * node.projectPos[1] + (1 - t) * node.polarPos[1],
    nonTopKNodeR * canvasScale,
    node.polarOrder,
  ]);
  const topKCircles = topKNodes.map((node) => [
    t * node.projectPos[0] + (1 - t) * node.polarPos[0],
    t * node.projectPos[1] + (1 - t) * node.polarPos[1],
    topKNodeR * canvasScale,
    node.polarOrder,
  ]);
  for (let i = 0; i < nprobe; i++) {
    let circles = nonTopKCircles.filter((circle) => circle[3] == i);
    drawCircle({
      ctx,
      circles,
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[i], nonTopKNodeOpacity),
    });
  }
  for (let i = 0; i < nprobe; i++) {
    let circles = topKCircles.filter((circle) => circle[3] == i);
    drawCircle({
      ctx,
      circles,
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[i], topKNodeOpacity),
      hasStroke: true,
      strokeStyle: hexWithOpacity(whiteColor, topKNodeOpacity),
      lineWidth: topKNodeStrokeWidth * canvasScale,
    });
  }
}
