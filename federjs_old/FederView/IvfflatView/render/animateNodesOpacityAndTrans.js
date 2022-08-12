import { drawCircle, hexWithOpacity, whiteColor } from 'Utils/renderUtils';
import { ANIMATION_TYPE, SEARCH_VIEW_TYPE } from 'Types';

export default function animateNodesOpacityAndTrans({
  ctx,
  searchViewLayoutData,
  federView,
  elapsed,
  duration,
  delay,
  animationType,
  newSearchViewType,
  oldSearchViewType,
}) {
  const { colorScheme, nprobe, topKNodes, nonTopKNodes } = searchViewLayoutData;
  const {
    ease,
    topKNodeR,
    topKNodeOpacity,
    topKNodeStrokeWidth,
    nonTopKNodeR,
    nonTopKNodeOpacity,
    canvasScale,
  } = federView;
  let t = ease((elapsed - delay) / duration);
  if (t > 1 || t < 0) return;
  t = animationType === ANIMATION_TYPE.enter ? 1 - t : t;

  const nonTopKCircles =
    (newSearchViewType === SEARCH_VIEW_TYPE.polar &&
      animationType === ANIMATION_TYPE.enter) ||
    (oldSearchViewType === SEARCH_VIEW_TYPE.polar &&
      animationType === ANIMATION_TYPE.exit)
      ? nonTopKNodes.map((node) => [
          t * node.voronoiPos[0] + (1 - t) * node.polarPos[0],
          t * node.voronoiPos[1] + (1 - t) * node.polarPos[1],
          nonTopKNodeR * canvasScale,
          node.polarOrder,
        ])
      : nonTopKNodes.map((node) => [
          t * node.voronoiPos[0] + (1 - t) * node.projectPos[0],
          t * node.voronoiPos[1] + (1 - t) * node.projectPos[1],
          nonTopKNodeR * canvasScale,
          node.polarOrder,
        ]);
  const topKCircles =
    (newSearchViewType === SEARCH_VIEW_TYPE.polar &&
      animationType === ANIMATION_TYPE.enter) ||
    (oldSearchViewType === SEARCH_VIEW_TYPE.polar &&
      animationType === ANIMATION_TYPE.exit)
      ? topKNodes.map((node) => [
          t * node.voronoiPos[0] + (1 - t) * node.polarPos[0],
          t * node.voronoiPos[1] + (1 - t) * node.polarPos[1],
          topKNodeR * canvasScale,
          node.polarOrder,
        ])
      : topKNodes.map((node) => [
          t * node.voronoiPos[0] + (1 - t) * node.projectPos[0],
          t * node.voronoiPos[1] + (1 - t) * node.projectPos[1],
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
  const opacity = t * 0.5 + (1 - t) * topKNodeOpacity;
  for (let i = 0; i < nprobe; i++) {
    let circles = topKCircles.filter((circle) => circle[3] == i);
    drawCircle({
      ctx,
      circles,
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[i], opacity),
      hasStroke: true,
      strokeStyle: hexWithOpacity(whiteColor, opacity),
      lineWidth: topKNodeStrokeWidth * canvasScale,
    });
  }
}
