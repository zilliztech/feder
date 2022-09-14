import { TDivPosStyle, TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType } from 'Types';
import { vecMultiply } from 'Utils/distFunc';
import IvfflatSearchView, { EStepType } from '.';

export default async function updateHoveredPanelNodeView(
  this: IvfflatSearchView
) {
  if (!this.hoveredNode) {
    this.hoveredPanel.setContent({ content: [] });
    return;
  }
  const node = this.hoveredNode;
  const mediaContent = {} as TInfoPanelContentItem;
  if (this.viewParams.mediaType === EMediaType.image)
    mediaContent.image = this.viewParams.mediaContent(node.id);
  else if (this.viewParams.mediaType === EMediaType.text)
    mediaContent.text = this.viewParams.mediaContent(node.id);
  this.hoveredPanel.setContent({
    themeColor: '#FFFC85',
    hasBorder: false,
    content: [
      { title: `Row No. ${node.id}` },
      { text: `distance: ${node.distance.toFixed(3)}` },
      {
        text: `belong to cluster-${node.clusterId}`,
      },
      mediaContent,
    ],
  });

  const { width, height, canvasScale } = this.viewParams;
  const pos =
    this.stepType === EStepType.polar ? node.polarPos : node.projectPos;
  const nodePos = vecMultiply(pos, 1 / canvasScale);
  const posStyle = {} as TDivPosStyle;
  if (nodePos[0] > width * 0.6) {
    posStyle.left = null;
    posStyle.right = `${width - nodePos[0] + 10}px`;
  } else {
    posStyle.left = `${nodePos[0] + 10}px`;
    posStyle.right = null;
  }
  if (nodePos[1] > height * 0.55) {
    posStyle.top = null;
    posStyle.bottom = `${height - nodePos[1] + 6}px`;
  } else {
    posStyle.top = `${nodePos[1] + 6}px`;
    posStyle.bottom = null;
  }
  this.hoveredPanel.setPosition(posStyle);
}
