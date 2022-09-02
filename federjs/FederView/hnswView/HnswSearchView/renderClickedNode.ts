import { drawCircles, drawEllipses } from 'FederView/renderUtils2D';
import HnswSearchView from '.';

export default function renderClickedNode(this: HnswSearchView) {
  if (!this.clickedNode) return;
  const {
    canvasScale,
    clickedNodeStroke,
    clickedNodeStrokeWidth,
    nodeEllipseRatio,
  } = this.viewParams;
  const r = this.clickedNode.r + (clickedNodeStrokeWidth + 0.5) * canvasScale;
  drawEllipses({
    ctx: this.ctx,
    ellipses: [
      [
        ...this.clickedNode.searchViewPosLevels[this.clickedLevel],
        r * nodeEllipseRatio,
        r,
      ],
    ],
    hasStroke: true,
    strokeStyle: clickedNodeStroke,
    lineWidth: clickedNodeStrokeWidth * canvasScale,
  });
}
