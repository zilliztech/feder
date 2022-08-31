import { drawCircles, hexWithOpacity } from 'FederView/renderUtils2D';
import { TCoord } from 'Types';
import { TVisDataIvfflatSearchViewNode } from 'Types/visData';
import { vecAdd, vecMultiply } from 'Utils/distFunc';
import IvfflatSearchView, { EStepType } from '.';

export default function transitionNodesEnter(
  this: IvfflatSearchView,
  t: number,
  newStepType: EStepType,
  reverse: boolean = false
) {
  if (t < 0) return;
  const {
    transitionReplaceTime,
    transitionNodesEnterTime,
    canvasScale,
    topkNodeR,
    topkNodeOpacity,
    nonTopkNodeR,
    nonTopkNodeOpacity,
  } = this.viewParams;
  if (t > transitionReplaceTime + transitionNodesEnterTime) return;

  t = reverse ? transitionReplaceTime + transitionNodesEnterTime - t : t;

  const colorScheme = this.colorScheme;

  if (t < transitionReplaceTime) {
    // enter
    const p = t / transitionReplaceTime;

    // non-topk
    for (let i = 0; i < this.nprobe; i++) {
      const nodes = this.searchViewNodes
        .filter((node) => !node.inTopK)
        .filter((node) => node.polarOrder === i);
      drawCircles({
        ctx: this.ctx,
        circles: nodes.map((node) => [
          ...node.voronoiPos,
          nonTopkNodeR * canvasScale,
        ]),
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], nonTopkNodeOpacity * p),
      });
    }

    // topk
    for (let i = 0; i < this.nprobe; i++) {
      const nodes = this.searchViewNodes
        .filter((node) => node.inTopK)
        .filter((node) => node.polarOrder === i);
      drawCircles({
        ctx: this.ctx,
        circles: nodes.map((node) => [
          ...node.voronoiPos,
          topkNodeR * canvasScale,
        ]),
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], topkNodeOpacity * p),
      });
    }
  } else {
    // move
    const p = (t - transitionReplaceTime) / transitionNodesEnterTime;

    const getPos =
      newStepType === EStepType.polar
        ? (node: TVisDataIvfflatSearchViewNode) =>
            vecAdd(
              vecMultiply(node.voronoiPos, 1 - p),
              vecMultiply(node.polarPos, p)
            ) as TCoord
        : (node: TVisDataIvfflatSearchViewNode) =>
            vecAdd(
              vecMultiply(node.voronoiPos, 1 - p),
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
        fillStyle: hexWithOpacity(colorScheme[i], nonTopkNodeOpacity),
      });
    }

    // topK
    for (let i = 0; i < this.nprobe; i++) {
      const nodes = this.searchViewNodes
        .filter((node) => node.inTopK)
        .filter((node) => node.polarOrder === i);
      drawCircles({
        ctx: this.ctx,
        circles: nodes.map((node) => [
          ...getPos(node),
          topkNodeR * canvasScale,
        ]),
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], topkNodeOpacity),
      });
    }
  }
}
