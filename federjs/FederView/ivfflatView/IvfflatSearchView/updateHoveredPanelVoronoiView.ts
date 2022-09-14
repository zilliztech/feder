import { TDivPosStyle, TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType } from 'Types';
import { randomSelect } from 'Utils';
import { vecMultiply } from 'Utils/distFunc';
import IvfflatSearchView from '.';

export default async function updateHoveredPanelVoronoiView(
  this: IvfflatSearchView
) {
  if (!this.hoveredCluster) {
    this.hoveredPanel.setContent({ content: [] });
    return;
  }

  const representIds = randomSelect(
    this.hoveredCluster.ids,
    this.viewParams.mediaContentCount
  );
  if (this.viewParams.mediaType === EMediaType.image) {
    const mediaContent = {} as TInfoPanelContentItem;
    mediaContent.images = representIds.map((id) =>
      this.viewParams.mediaContent(id)
    );
    this.hoveredPanel.setContent({
      themeColor: '#FFFC85',
      hasBorder: true,
      content: [
        {
          text: `cluster-${this.hoveredCluster.clusterId}`,
        },
        {
          text: `including ${this.hoveredCluster.count} vectors`,
        },
        mediaContent,
      ],
    });
  } else if (this.viewParams.mediaType === EMediaType.text) {
    const mediaContents = representIds.map(
      (id) =>
        ({ text: this.viewParams.mediaContent(id) } as TInfoPanelContentItem)
    );
    this.hoveredPanel.setContent({
      themeColor: '#FFFC85',
      hasBorder: true,
      content: [
        {
          text: `cluster-${this.hoveredCluster.clusterId}`,
        },
        {
          text: `including ${this.hoveredCluster.count} vectors`,
        },
        ...mediaContents,
      ],
    });
  }

  const { width, height, canvasScale } = this.viewParams;
  const pos = vecMultiply(this.hoveredCluster.SVPolyCentroid, 1 / canvasScale);
  const posStyle = {} as TDivPosStyle;
  if (pos[0] > width * 0.6) {
    posStyle.left = null;
    posStyle.right = `${width - pos[0] + 10}px`;
  } else {
    posStyle.left = `${pos[0] + 10}px`;
    posStyle.right = null;
  }
  if (pos[1] > height * 0.55) {
    posStyle.top = null;
    posStyle.bottom = `${height - pos[1] + 6}px`;
  } else {
    posStyle.top = `${pos[1] + 6}px`;
    posStyle.bottom = null;
  }
  this.hoveredPanel.setPosition(posStyle);
}
