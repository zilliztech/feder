import { SEARCH_VIEW_TYPE } from 'Types';
import { whiteColor, drawCircle } from 'Utils/renderUtils';

export default function renderTarget(
  ctx,
  searchViewType,
  { targetNode },
  { targetNodeR, canvasScale, targetNodeStrokeWidth }
) {
  if (searchViewType === SEARCH_VIEW_TYPE.project) return;
  const circle =
    searchViewType === SEARCH_VIEW_TYPE.voronoi
      ? [...targetNode.SVPos, targetNodeR * canvasScale]
      : [...targetNode.polarPos, targetNodeR * canvasScale];
  drawCircle({
    ctx,
    circles: [circle],
    hasStroke: true,
    strokeStyle: whiteColor,
    lineWidth: targetNodeStrokeWidth * canvasScale,
  });
}
