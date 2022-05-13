import { SEARCH_VIEW_TYPE } from 'Types';
import { hexWithOpacity, drawCircle } from 'Utils/renderUtils';

export default function renderNormalNodes({
  ctx,
  colorScheme,
  nonTopKNodes,
  searchViewType,
  nonTopKNodeR,
  canvasScale,
  nprobe,
  nonTopKNodeOpacity,
}) {
  const allCircles =
    searchViewType === SEARCH_VIEW_TYPE.polar
      ? nonTopKNodes.map((node) => [
          ...node.polarPos,
          nonTopKNodeR * canvasScale,
          node.polarOrder,
        ])
      : nonTopKNodes.map((node) => [
          ...node.projectPos,
          nonTopKNodeR * canvasScale,
          node.polarOrder,
        ]);
  for (let i = 0; i < nprobe; i++) {
    let circles = allCircles.filter((circle) => circle[3] == i);
    drawCircle({
      ctx,
      circles,
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[i], nonTopKNodeOpacity),
    });
  }
}
