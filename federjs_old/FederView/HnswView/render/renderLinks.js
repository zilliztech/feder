import {
  drawLinesWithLinearGradient,
  normalGradientStopColors,
} from 'Utils/renderUtils';
import { shortenLine } from 'Utils';

export default function renderLinks(
  ctx,
  links,
  level,
  { shortenLineD, overviewLinkLineWidth, canvasScale }
) {
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
