import { whiteColor, drawCircle } from 'Utils/renderUtils';
import { ANIMATION_TYPE, SEARCH_VIEW_TYPE } from 'Types';

export default function animateTargetNode({
  ctx,
  elapsed,
  duration,
  delay,
  ease,
  targetNode,
  targetNodeR,
  canvasScale,
  targetNodeStrokeWidth,
  animationType,
  newSearchViewType,
}) {
  let t = ease((elapsed - delay) / duration);
  if (newSearchViewType === SEARCH_VIEW_TYPE.project) {
    if (t < 0 || t > 1) return;
  }
  if (t > 1) t = 1;
  if (t < 0) t = 0;
  t = animationType === ANIMATION_TYPE.enter ? t : 1 - t;
  const x = targetNode.SVPos[0] * t + targetNode.polarPos[0] * (1 - t);
  const y = targetNode.SVPos[1] * t + targetNode.polarPos[1] * (1 - t);

  drawCircle({
    ctx,
    circles: [[x, y, targetNodeR * canvasScale]],
    hasStroke: true,
    strokeStyle: whiteColor,
    lineWidth: targetNodeStrokeWidth * canvasScale,
  });
}
