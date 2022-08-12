import {
  drawVoronoi,
  hexWithOpacity,
  whiteColor,
  blackColor,
  ZLightBlue,
} from 'Utils/renderUtils';
import { ANIMATION_TYPE } from 'Types';

export default function animateNprobeClustersTrans({
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
  t = animationType === ANIMATION_TYPE.enter ? 1 - t : t;

  const pointsList = nprobeClusters.map((cluster) =>
    cluster.SVPolyPoints.map((point) => [
      point[0] + t * cluster.SVNextLevelTran[0],
      point[1] + t * cluster.SVNextLevelTran[1],
    ])
  );
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
