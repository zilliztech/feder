import {
  drawEllipses,
  drawLines,
  getInprocessPos,
  hexWithOpacity,
  shortenLine,
} from 'FederView/renderUtils2D';
import { TVisDataHnswNode } from 'Types/visData';
import HnswSearchView from '.';

export default function renderEntryAndTargetLinks(
  this: HnswSearchView,
  showEntryNodes: TVisDataHnswNode[],
  inprocessEntryNodes: TVisDataHnswNode[],
  level: number
) {
  const {
    linkShortenLineD,
    canvasScale,
    importantGradientStopColors,
    importantLinkWidth,
    targetLinkWidth,
    targetGradientStopColors,
    nodeEllipseRatio,
    targetNodeFill,
    targetNodeOpacity,
    nodeShadowBlur,
  } = this.viewParams;
  const pointsList = showEntryNodes.map((node) =>
    shortenLine(
      node.searchViewPosLevels[level + 1],
      node.searchViewPosLevels[level],
      linkShortenLineD * canvasScale
    )
  );
  drawLines({
    ctx: this.ctx,
    pointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: importantGradientStopColors,
    lineWidth: importantLinkWidth * canvasScale,
    lineCap: 'round',
  });

  const targetLinkPointsList =
    showEntryNodes.length === 0
      ? []
      : [
          shortenLine(
            this.searchTarget.searchViewPosLevels[level + 1],
            this.searchTarget.searchViewPosLevels[level],
            linkShortenLineD * canvasScale
          ),
        ];
  drawLines({
    ctx: this.ctx,
    pointsList: targetLinkPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: targetGradientStopColors,
    lineWidth: targetLinkWidth * canvasScale,
    lineCap: 'round',
  });

  const inprocessPointsList = inprocessEntryNodes.map((node) =>
    shortenLine(
      node.searchViewPosLevels[level + 1],
      getInprocessPos(
        node.searchViewPosLevels[level + 1],
        node.searchViewPosLevels[level],
        node.inProcessP
      ),
      linkShortenLineD * canvasScale
    )
  );
  drawLines({
    ctx: this.ctx,
    pointsList: inprocessPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: importantGradientStopColors,
    lineWidth: importantLinkWidth * canvasScale,
    lineCap: 'round',
  });

  const inProcessTargetLinkPointsList =
    inprocessEntryNodes.length === 0
      ? []
      : [
          shortenLine(
            this.searchTarget.searchViewPosLevels[level + 1],
            getInprocessPos(
              this.searchTarget.searchViewPosLevels[level + 1],
              this.searchTarget.searchViewPosLevels[level],
              inprocessEntryNodes[0].inProcessP
            ),
            linkShortenLineD * canvasScale
          ),
        ];
  drawLines({
    ctx: this.ctx,
    pointsList: inProcessTargetLinkPointsList,
    hasStroke: true,
    isStrokeLinearGradient: true,
    gradientStopColors: targetGradientStopColors,
    lineWidth: targetLinkWidth * canvasScale,
    lineCap: 'round',
  });

  drawEllipses({
    ctx: this.ctx,
    ellipses:
      showEntryNodes.length === 0
        ? []
        : [
            [
              ...this.searchTarget.searchViewPosLevels[level],
              this.searchTarget.r * nodeEllipseRatio,
              this.searchTarget.r,
            ],
          ],
    hasFill: true,
    fillStyle: hexWithOpacity(targetNodeFill, targetNodeOpacity),
    shadowColor: targetNodeFill,
    shadowBlur: nodeShadowBlur * canvasScale,
  });

  if (level === this.searchNodesLevels.length - 1) {
    drawEllipses({
      ctx: this.ctx,
      ellipses: [
        [
          ...this.searchTarget.searchViewPosLevels[level],
          this.searchTarget.r * nodeEllipseRatio,
          this.searchTarget.r,
        ],
      ],
      hasFill: true,
      fillStyle: hexWithOpacity(targetNodeFill, targetNodeOpacity),
      shadowColor: targetNodeFill,
      shadowBlur: nodeShadowBlur * canvasScale,
    });
  }
}
