import { shortenLine } from 'Utils';
import {
  drawEllipse,
  drawLinesWithLinearGradient,
  highLightGradientStopColors,
  highLightColor,
  hexWithOpacity,
} from 'Utils/renderUtils';

export default function renderShortestPath(
  ctx,
  level,
  { SPLinksLevels, SPNodesLevels },
  {
    shortenLineD,
    canvasScale,
    shortestPathLineWidth,
    highlightRadiusExt,
    shadowBlur,
    ellipseRation,
    posAttr = 'overviewPosLevels',
  }
) {
  const pointsList = (SPLinksLevels ? SPLinksLevels[level] : [])
    .map((link) =>
      link.source === link.target
        ? !!link.source[posAttr][level + 1]
          ? [link.source[posAttr][level + 1], link.target[posAttr][level]]
          : null
        : [link.source[posAttr][level], link.target[posAttr][level]]
    )
    .filter((a) => a)
    .map((points) => shortenLine(...points, shortenLineD * canvasScale));
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: highLightGradientStopColors,
    lineWidth: shortestPathLineWidth * canvasScale,
    lineCap: 'round',
  });

  drawEllipse({
    ctx,
    circles: (SPNodesLevels ? SPNodesLevels[level] : [])
      .filter((node) => !!node[posAttr][level])
      .map((node) => [
        ...node[posAttr][level],
        (node.r + highlightRadiusExt) * ellipseRation * canvasScale,
        (node.r + highlightRadiusExt) * canvasScale,
      ]),
    hasFill: true,
    fillStyle: hexWithOpacity(highLightColor, 1),
    shadowColor: highLightColor,
    shadowBlur: shadowBlur * canvasScale,
  });
}
