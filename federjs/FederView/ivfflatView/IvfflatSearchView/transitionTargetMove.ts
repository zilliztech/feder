import { drawCircles } from 'FederView/renderUtils2D';
import { EStepType, TCoord } from 'Types';
import { vecAdd, vecMultiply } from 'Utils/distFunc';
import IvfflatSearchView from '.';
import { stepType2targePos } from './renderTarget';

export default function transitionTargetMove(
  this: IvfflatSearchView,
  t: number,
  duration: number,
  preStepType: EStepType,
  nextStepType: EStepType
) {
  if (t > duration || t < 0) return;
  const p = t / duration;
  const startPoint = stepType2targePos[preStepType](this.targetNode);
  const endPoint = stepType2targePos[nextStepType](this.targetNode);
  const position = vecAdd(
    vecMultiply(startPoint, 1 - p),
    vecMultiply(endPoint, p)
  ) as TCoord;

  const { canvasScale, targetOuterR, targetInnerR, targetNodeStroke } =
    this.viewParams;
  drawCircles({
    ctx: this.ctx,
    circles: [[...position, targetInnerR * canvasScale]],
    hasStroke: true,
    strokeStyle: targetNodeStroke,
    lineWidth: (targetOuterR - targetInnerR) * canvasScale,
  });
}
