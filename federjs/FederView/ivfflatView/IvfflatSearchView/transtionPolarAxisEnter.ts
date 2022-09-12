import * as d3 from 'd3';
import {
  drawCircles,
  hexWithOpacity,
  TCircleData,
} from 'FederView/renderUtils2D';
import IvfflatSearchView from '.';

export default function transitionPolarAxisEnter(
  this: IvfflatSearchView,
  t: number,
  reverse: boolean = false
) {
  const {
    transitionNodesEnterTime,
    canvasScale,
    polarAxisTickCount,
    polarAxisStrokeWidth,
    polarAxisStroke,
    polarAxisOpacity,
  } = this.viewParams;

  t = Math.max(t, 0);
  t = Math.min(t, transitionNodesEnterTime);
  t = reverse ? transitionNodesEnterTime - t : t;
  const p = t / transitionNodesEnterTime;
  const opacity = p * polarAxisOpacity;

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
    strokeStyle: hexWithOpacity(polarAxisStroke, opacity),
  });
}
