import { drawCircles, hexWithOpacity } from 'FederView/renderUtils2D';
import { EStepType, TCoord } from 'Types';
import { TVisDataIvfflatSearchViewNode } from 'Types/visData';
import { vecAdd, vecMultiply } from 'Utils/distFunc';
import IvfflatSearchView from '.';

export default function transitionNodesMove(
  this: IvfflatSearchView,
  t: number
) {
  if (t < 0) return;
  const {
    transitionNodesMoveTime,
    canvasScale,
    topkNodeR,
    topkNodeOpacity,
    nonTopkNodeR,
    nonTopkNodeOpacity,
  } = this.viewParams;
  if (t > transitionNodesMoveTime) return;

  // default polar => project
  let p = t / transitionNodesMoveTime;
  p = this.stepType === EStepType.polar ? p : 1 - p;
  const getPos = (node: TVisDataIvfflatSearchViewNode) =>
    vecAdd(
      vecMultiply(node.polarPos, 1 - p),
      vecMultiply(node.projectPos, p)
    ) as TCoord;

  // nonTopK
  for (let i = 0; i < this.nprobe; i++) {
    const nodes = this.searchViewNodes
      .filter((node) => !node.inTopK)
      .filter((node) => node.polarOrder === i);
    drawCircles({
      ctx: this.ctx,
      circles: nodes.map((node) => [
        ...getPos(node),
        nonTopkNodeR * canvasScale,
      ]),
      hasFill: true,
      fillStyle: hexWithOpacity(this.colorScheme[i], nonTopkNodeOpacity),
    });
  }

  // topK
  for (let i = 0; i < this.nprobe; i++) {
    const nodes = this.searchViewNodes
      .filter((node) => node.inTopK)
      .filter((node) => node.polarOrder === i);
    drawCircles({
      ctx: this.ctx,
      circles: nodes.map((node) => [...getPos(node), topkNodeR * canvasScale]),
      hasFill: true,
      fillStyle: hexWithOpacity(this.colorScheme[i], topkNodeOpacity),
    });
  }
}
