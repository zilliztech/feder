import { drawLinesWithLinearGradient, normalGradientStopColors } from 'Utils/renderUtils';
import { shortenLine } from 'Utils';

export default function renderLinks({
  ctx,
  shortenLineD,overviewLinkLineWidth,
  canvasScale,
  links,
  level,
}) {
  const pointsList = links.map((link) =>
    shortenLine(
      link.source.overviewPosLevels[level],
      link.target.overviewPosLevels[level],
      shortenLineD * canvasScale
    )
  );
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: normalGradientStopColors,
    lineWidth: overviewLinkLineWidth * canvasScale,
    lineCap: 'round',
  });
}
