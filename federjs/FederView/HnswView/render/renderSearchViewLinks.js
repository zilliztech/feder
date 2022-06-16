import {
  drawLinesWithLinearGradient,
  highLightGradientStopColors,
  normalGradientStopColors,
} from 'Utils/renderUtils';
import { shortenLine, getInprocessPos } from 'Utils';
import { HNSW_LINK_TYPE } from 'Types';

export default function renderSearchViewLinks(
  ctx,
  { links, inProcessLinks, level },
  { shortenLineD, canvasScale }
) {
  let pointsList = [];
  let inprocessPointsList = [];

  // Visited
  pointsList = links
    .filter((link) => link.type === HNSW_LINK_TYPE.Visited)
    .map((link) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        link.target.searchViewPosLevels[level],
        shortenLineD * canvasScale
      )
    );
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: normalGradientStopColors,
    lineWidth: 4,
    lineCap: 'round',
  });
  inprocessPointsList = inProcessLinks
    .filter(({ link }) => link.type === HNSW_LINK_TYPE.Visited)
    .map(({ t, link }) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        getInprocessPos(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
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
    gradientStopColors: normalGradientStopColors,
    lineWidth: 4,
    lineCap: 'round',
  });

  // Extended
  pointsList = links
    .filter((link) => link.type === HNSW_LINK_TYPE.Extended)
    .map((link) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        link.target.searchViewPosLevels[level],
        shortenLineD
      )
    );
  drawLinesWithLinearGradient({
    ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: normalGradientStopColors,
    lineWidth: 4,
    lineCap: 'round',
  });
  inprocessPointsList = inProcessLinks
    .filter(({ link }) => link.type === HNSW_LINK_TYPE.Extended)
    .map(({ t, link }) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        getInprocessPos(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
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
    gradientStopColors: normalGradientStopColors,
    lineWidth: 4,
    lineCap: 'round',
  });

  // Searched
  pointsList = links
    .filter((link) => link.type === HNSW_LINK_TYPE.Searched)
    .map((link) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        link.target.searchViewPosLevels[level],
        shortenLineD
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
  inprocessPointsList = inProcessLinks
    .filter(({ link }) => link.type === HNSW_LINK_TYPE.Searched)
    .map(({ t, link }) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        getInprocessPos(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
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

  // Fine
  pointsList = links
    .filter((link) => link.type === HNSW_LINK_TYPE.Fine)
    .map((link) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        link.target.searchViewPosLevels[level],
        shortenLineD
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
  inprocessPointsList = inProcessLinks
    .filter(({ link }) => link.type === HNSW_LINK_TYPE.Fine)
    .map(({ t, link }) =>
      shortenLine(
        link.source.searchViewPosLevels[level],
        getInprocessPos(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
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
}
