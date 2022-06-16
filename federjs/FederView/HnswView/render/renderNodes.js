import { drawEllipse, ZBlue, hexWithOpacity } from 'Utils/renderUtils';

export default function renderNodes(
  ctx,
  nodes,
  level,
  { canvasScale, ellipseRation, shadowBlur }
) {
  drawEllipse({
    ctx,
    circles: nodes.map((node) => [
      ...node.overviewPosLevels[level],
      node.r * ellipseRation * canvasScale,
      node.r * canvasScale,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(ZBlue, 0.75),
    shadowColor: ZBlue,
    shadowBlur: shadowBlur * canvasScale,
  });
}
