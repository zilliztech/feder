import { drawCircles } from 'FederView/renderUtils2D';
import { EStepType, TCoord } from 'Types';
import { TVisDataIvfflatSearchViewTargetNode } from 'Types/visData';
import IvfflatSearchView from '.';

export const stepType2targePos = {
  [EStepType.voronoi]: (node: TVisDataIvfflatSearchViewTargetNode) =>
    node.SVPos,
  [EStepType.polar]: (node: TVisDataIvfflatSearchViewTargetNode) =>
    node.polarPos,
  [EStepType.project]: (node: TVisDataIvfflatSearchViewTargetNode) =>
    node.projectPos,
};

export default function renderTarget(this: IvfflatSearchView) {
  const position = stepType2targePos[this.stepType](this.targetNode) as TCoord;
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
