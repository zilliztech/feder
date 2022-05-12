import { hexWithOpacity, drawCircle, ZBlue } from 'Utils/renderUtils';
import * as d3 from 'd3';

export default function renderPolarAxis({
  ctx,
  axisTickCount,
  polarOrigin,
  polarMaxR,
  polarAxisStrokeWidth,
  canvasScale,
}) {
  const circles = d3
    .range(axisTickCount)
    .map((i) => [...polarOrigin, ((i + 0.7) / axisTickCount) * polarMaxR]);
  drawCircle({
    ctx,
    circles,
    hasStroke: true,
    lineWidth: polarAxisStrokeWidth * canvasScale,
    strokeStyle: hexWithOpacity(ZBlue, 0.3),
  });
}
