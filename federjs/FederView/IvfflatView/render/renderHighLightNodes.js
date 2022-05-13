import { SEARCH_VIEW_TYPE } from 'Types';
import { hexWithOpacity, drawCircle, whiteColor } from 'Utils/renderUtils';

export default function renderHighLightNodes({
  ctx,
  colorScheme,
  topKNodes,
  searchViewType,
  topKNodeR,
  canvasScale,
  nprobe,
  topKNodeOpacity,
  topKNodeStrokeWidth,
}) {
  const allCircles =
    searchViewType === SEARCH_VIEW_TYPE.polar
      ? topKNodes.map((node) => [
          ...node.polarPos,
          topKNodeR * canvasScale,
          node.polarOrder,
        ])
      : topKNodes.map((node) => [
          ...node.projectPos,
          topKNodeR * canvasScale,
          node.polarOrder,
        ]);
  for (let i = 0; i < nprobe; i++) {
    let circles = allCircles.filter((circle) => circle[3] == i);
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
