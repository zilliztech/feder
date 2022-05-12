import { drawEllipse, hexWithOpacity, ZYellow } from 'Utils/renderUtils';

export default function renderSelectedNode({ ctx, ellipseRation, pos, r }) {
  drawEllipse({
    ctx,
    circles: [[...pos, r * ellipseRation, r]],
    hasStroke: true,
    strokeStyle: hexWithOpacity(ZYellow, 0.8),
    lineWidth: 4,
  });
}
