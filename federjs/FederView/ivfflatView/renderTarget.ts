import { drawCircles } from 'FederView/renderUtils2D';
import IvfflatSearchView, { EStepType } from './IvfflatSearchView';

export default function renderTarget(this: IvfflatSearchView) {
  const position =
    this.stepType === EStepType.voronoi
      ? this.targetNode.SVPos
      : this.targetNode.polarPos;
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
