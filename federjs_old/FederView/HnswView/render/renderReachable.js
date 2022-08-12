import {
  hexWithOpacity,
  whiteColor,
  drawLinesWithLinearGradient,
  neighbourGradientStopColors,
  drawEllipse,
} from 'Utils/renderUtils';

import { shortenLine } from 'Utils';

export default function renderReachableData(
  ctx,
  level,
  { reachableLevel, reachableNodes, reachableLinks },
  {
    shortenLineD,
    canvasScale,
    reachableLineWidth,
    ellipseRation,
    shadowBlur,
    highlightRadiusExt,
    posAttr = 'overviewPosLevels',
  }
) {
  if (level != reachableLevel) return;
  const pointsList = reachableLinks
    .map((link) => [link.source[posAttr][level], link.target[posAttr][level]])
    .map((points) => shortenLine(...points, shortenLineD * canvasScale));
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: neighbourGradientStopColors,
    lineWidth: reachableLineWidth * canvasScale,
    lineCap: 'round',
  });

  drawEllipse({
    ctx,
    circles: reachableNodes.map((node) => [
      ...node[posAttr][level],
      (node.r + highlightRadiusExt) * ellipseRation * canvasScale,
      (node.r + highlightRadiusExt) * canvasScale,
    ]),
    hasFill: true,
    fillStyle: hexWithOpacity(whiteColor, 1),
    shadowColor: whiteColor,
    shadowBlur: shadowBlur * canvasScale,
  });
}
