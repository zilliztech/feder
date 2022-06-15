import { VIEW_TYPE } from 'Types';
import {
  drawVoronoi,
  ZBlue,
  hexWithOpacity,
  blackColor,
} from 'Utils/renderUtils';

export default function renderNormalVoronoi(
  ctx,
  viewType,
  { clusters, nonNprobeClusters },
  { voronoiStrokeWidth, canvasScale }
) {
  const pointsList =
    viewType === VIEW_TYPE.overview
      ? clusters.map((cluster) => cluster.OVPolyPoints)
      : nonNprobeClusters.map((cluster) => cluster.SVPolyPoints);
  drawVoronoi({
    ctx,
    pointsList,
    hasStroke: true,
    strokeStyle: blackColor,
    lineWidth: voronoiStrokeWidth * canvasScale,
    hasFill: true,
    fillStyle: hexWithOpacity(ZBlue, 1),
  });
}
