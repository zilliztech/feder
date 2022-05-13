import { drawEllipse, ZBlue, hexWithOpacity } from 'Utils/renderUtils';

export default function renderNodes({
  ctx,
  canvasScale,
  ellipseRation,shadowBlur,
  nodes,
  level,
}) {
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
