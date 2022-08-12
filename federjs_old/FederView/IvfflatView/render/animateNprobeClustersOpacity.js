import {
  drawVoronoi,
  hexWithOpacity,
  blackColor,
  ZLightBlue,
} from 'Utils/renderUtils';
import { ANIMATION_TYPE } from 'Types';

export default function animateNonNprobeClusters({
  ctx,
  searchViewLayoutData,
  federView,
  elapsed,
  duration,
  delay,
  animationType,
}) {
  const { nprobeClusters } = searchViewLayoutData;
  const { ease, voronoiStrokeWidth, canvasScale } = federView;
  let t = ease((elapsed - delay) / duration);
  if (t > 1 || t < 0) return;
  t = animationType === ANIMATION_TYPE.enter ? t : 1 - t;
  const opacity = t;
  const pointsList = nprobeClusters.map((cluster) =>
    cluster.SVPolyPoints.map((point) => [
      point[0] + cluster.SVNextLevelTran[0],
      point[1] + cluster.SVNextLevelTran[1],
    ])
  );
  drawVoronoi({
    ctx,
    pointsList,
    hasStroke: true,
    strokeStyle: blackColor,
    lineWidth: voronoiStrokeWidth * canvasScale,
    hasFill: true,
    fillStyle: hexWithOpacity(ZLightBlue, opacity),
  });
}
