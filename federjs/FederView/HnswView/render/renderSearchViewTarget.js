import { drawEllipse, hexWithOpacity, whiteColor } from 'Utils/renderUtils';

export default function renderSearchViewTarget({
  ctx,
  ellipseRation,
  node,
  level,
}) {
  drawEllipse({
    ctx,
    circles: [
      [...node.searchViewPosLevels[level], node.r * ellipseRation, node.r],
    ],
    hasFill: true,
    fillStyle: hexWithOpacity(whiteColor, 1),
    shadowColor: whiteColor,
    shadowBlur: 6,
  });
}
