import { VIEW_TYPE } from 'Types';
import {
  drawVoronoi,
  ZLightBlue,
  ZYellow,
  hexWithOpacity,
  blackColor,
} from 'Utils/renderUtils';

export default function renderNormalVoronoi(ctx, viewType, hoveredCluster, {
  voronoiStrokeWidth,
  canvasScale,
}) {
  const pointsList =
    viewType === VIEW_TYPE.overview
      ? [hoveredCluster.OVPolyPoints]
      : [hoveredCluster.SVPolyPoints];
  drawVoronoi({
    ctx,
    pointsList,
    hasStroke: true,
    strokeStyle: blackColor,
    lineWidth: voronoiStrokeWidth * canvasScale,
    hasFill: true,
    fillStyle: hexWithOpacity(ZYellow, 0.8),
  });
}
