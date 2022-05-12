import {
  drawVoronoi,
  hexWithOpacity,
  blackColor,
  ZBlue,
} from 'Utils/renderUtils';
import { ANIMATION_TYPE } from 'Types';

export default function animateNonNprobeClusters({
  ctx,
  elapsed,
  duration,
  delay,
  ease,
  nonNprobeClusters,
  voronoiStrokeWidth,
  canvasScale,
  animationType,
}) {
  let t = ease((elapsed - delay) / duration);
  if (t > 1 || t < 0) return;
  const opacity = animationType === ANIMATION_TYPE.enter ? t : 1 - t;
  const pointsList = nonNprobeClusters.map((cluster) => cluster.SVPolyPoints);
  drawVoronoi({
    ctx,
    pointsList,
    hasStroke: true,
    strokeStyle: blackColor,
    lineWidth: voronoiStrokeWidth * canvasScale,
    hasFill: true,
    fillStyle: hexWithOpacity(ZBlue, opacity),
  });
}
