import * as d3 from 'd3';
import {
  drawCircles,
  hexWithOpacity,
  TCircleData,
} from 'FederView/renderUtils2D';
import IvfflatSearchView from '.';

export default function renderPolarAxis(this: IvfflatSearchView) {
  const {
    canvasScale,
    polarAxisTickCount,
    polarAxisStrokeWidth,
    polarAxisStroke,
    polarAxisOpacity,
  } = this.viewParams;

  const circles = d3
    .range(polarAxisTickCount)
    .map(
      (i) =>
        [
          ...this.polarOrigin,
          ((i + 0.7) / polarAxisTickCount) * this.polarR,
        ] as TCircleData
    );
  drawCircles({
    ctx: this.ctx,
    circles,
    hasStroke: true,
    lineWidth: polarAxisStrokeWidth * canvasScale,
    strokeStyle: hexWithOpacity(polarAxisStroke, polarAxisOpacity),
  });
}
