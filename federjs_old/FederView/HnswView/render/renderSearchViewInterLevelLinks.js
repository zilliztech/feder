import {
  drawLinesWithLinearGradient,
  highLightGradientStopColors,
  targetLevelGradientStopColors,
} from 'Utils/renderUtils';
import { shortenLine, getInprocessPos } from 'Utils';

export default function renderSearchViewInterLevelLinks(
  ctx,
  { entryNodes, inprocessEntryNodes, searchTarget, level },
  { shortenLineD, canvasScale }
) {
  const pointsList = entryNodes.map((node) =>
    shortenLine(
      node.searchViewPosLevels[level + 1],
      node.searchViewPosLevels[level],
      shortenLineD * canvasScale
    )
  );
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: highLightGradientStopColors,
    lineWidth: 6,
    lineCap: 'round',
  });
  const targetPointsList =
    pointsList.length === 0
      ? []
      : [
          shortenLine(
            searchTarget.searchViewPosLevels[level + 1],
            searchTarget.searchViewPosLevels[level],
            shortenLineD
          ),
        ];
  drawLinesWithLinearGradient({
    ctx,
    pointsList: targetPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: targetLevelGradientStopColors,
    lineWidth: 6,
    lineCap: 'round',
  });

  const inprocessPointsList = inprocessEntryNodes.map(({ node, t }) =>
    shortenLine(
      node.searchViewPosLevels[level + 1],
      getInprocessPos(
        node.searchViewPosLevels[level + 1],
        node.searchViewPosLevels[level],
        t
      ),
      shortenLineD
    )
  );
  drawLinesWithLinearGradient({
    ctx,
    pointsList: inprocessPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: highLightGradientStopColors,
    lineWidth: 6,
    lineCap: 'round',
  });
  const inprocessTargetPointsList =
    inprocessPointsList.length === 0
      ? []
      : [
          shortenLine(
            searchTarget.searchViewPosLevels[level + 1],
            getInprocessPos(
              searchTarget.searchViewPosLevels[level + 1],
              searchTarget.searchViewPosLevels[level],
              inprocessEntryNodes[0].t
            ),
            shortenLineD
          ),
        ];
  drawLinesWithLinearGradient({
    ctx,
    pointsList: inprocessTargetPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: targetLevelGradientStopColors,
    lineWidth: 6,
    lineCap: 'round',
  });
}
