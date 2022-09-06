import { drawLines, shortenLine } from 'FederView/renderUtils2D';
import { TD3Link } from 'Types';
import HnswOverview from '.';

export default function renderLinks(
  this: HnswOverview,
  baseLinks: TD3Link[],
  pathFromEntryLinks: TD3Link[],
  path2NeighborLinks: TD3Link[]
) {
  const {
    canvasScale,
    normalLinkWidth,
    normalGradientStopColors,
    importantLinkWidth,
    importantGradientStopColors,
    targetLinkWidth,
    targetGradientStopColors,
    linkShortenLineD,
  } = this.viewParams;

  const baseLinksPointsList = baseLinks.map(({ source, target }) => {
    const startPos = this.idWithLevel2node[source].overviewPos;
    const endPos = this.idWithLevel2node[target].overviewPos;
    return shortenLine(startPos, endPos, linkShortenLineD * canvasScale);
  });

  const pathFromEntryPointsList = pathFromEntryLinks.map(
    ({ source, target }) => {
      const startPos = this.idWithLevel2node[source].overviewPos;
      const endPos = this.idWithLevel2node[target].overviewPos;
      return shortenLine(startPos, endPos, linkShortenLineD * canvasScale);
    }
  );

  const path2NeighborPointsList = path2NeighborLinks.map(
    ({ source, target }) => {
      const startPos = this.idWithLevel2node[source].overviewPos;
      const endPos = this.idWithLevel2node[target].overviewPos;
      return shortenLine(startPos, endPos, linkShortenLineD * canvasScale);
    }
  );

  drawLines({
    ctx: this.ctx,
    pointsList: baseLinksPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: normalGradientStopColors,
    lineWidth: normalLinkWidth * canvasScale,
    lineCap: 'round',
  });

  drawLines({
    ctx: this.ctx,
    pointsList: path2NeighborPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: targetGradientStopColors,
    lineWidth: targetLinkWidth * canvasScale,
    lineCap: 'round',
  });

  drawLines({
    ctx: this.ctx,
    pointsList: pathFromEntryPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: importantGradientStopColors,
    lineWidth: importantLinkWidth * canvasScale,
    lineCap: 'round',
  });
}
