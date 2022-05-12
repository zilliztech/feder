import { VIEW_TYPE } from 'Types';
import {
  drawVoronoi,
  ZYellow,
  ZLightBlue,
  hexWithOpacity,
  blackColor,
} from 'Utils/renderUtils';

export default function renderHighlightVoronoi({
  ctx,
  nprobeClusters,
  voronoiStrokeWidth,
  canvasScale,
}) {
  const pointsList = nprobeClusters.map((cluster) => cluster.SVPolyPoints);
  drawVoronoi({
    ctx,
    pointsList,
    hasStroke: true,
    strokeStyle: blackColor,
    lineWidth: voronoiStrokeWidth * canvasScale,
    hasFill: true,
    fillStyle: hexWithOpacity(ZLightBlue, 1),
  });
}
