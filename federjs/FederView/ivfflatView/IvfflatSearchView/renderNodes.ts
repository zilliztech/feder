import * as d3 from 'd3';
import { drawCircles, hexWithOpacity } from 'FederView/renderUtils2D';
import { TVisDataIvfflatSearchViewNode } from 'Types/visData';
import IvfflatSearchView, { EStepType } from '.';

export default function renderNodes(this: IvfflatSearchView) {
  const {
    canvasScale,
    topkNodeR,
    topkNodeOpacity,
    nonTopkNodeR,
    nonTopkNodeOpacity,
    highlightNodeR,
    highlightNodeStroke,
    highlightNodeStrokeWidth,
    highlightNodeOpacity,
  } = this.viewParams;
  const colorScheme = this.colorScheme;
  const getPos =
    this.stepType === EStepType.polar
      ? (node: TVisDataIvfflatSearchViewNode) => node.polarPos
      : (node: TVisDataIvfflatSearchViewNode) => node.projectPos;

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
      circles: nodes.map((node) => [...getPos(node), topkNodeR * canvasScale]),
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[i], topkNodeOpacity),
    });
  }

  // hovered
  this.hoveredNode &&
    drawCircles({
      ctx: this.ctx,
      circles: [[...getPos(this.hoveredNode), highlightNodeR * canvasScale]],
      hasFill: true,
      fillStyle: hexWithOpacity(
        colorScheme[this.hoveredNode.polarOrder],
        highlightNodeOpacity
      ),
      hasStroke: true,
      strokeStyle: highlightNodeStroke,
      lineWidth: highlightNodeStrokeWidth * canvasScale,
    });
}
