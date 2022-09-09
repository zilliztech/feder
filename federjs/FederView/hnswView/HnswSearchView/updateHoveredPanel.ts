import { TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType, TCoord } from 'Types';
import HnswSearchView from '.';

export default async function updateHoveredPanel(
  this: HnswSearchView,
  hoveredPanelPos: TCoord,
  reverse = false
) {
  if (!hoveredPanelPos) {
    this.hoveredPanel.setContent({ content: [] });
    return;
  }
  if (reverse)
    this.hoveredPanel.setPosition({
      left: null,
      right: `${this.viewParams.width - hoveredPanelPos[0]}px`,
      top: `${hoveredPanelPos[1] - 4}px`,
    });
  else
    this.hoveredPanel.setPosition({
      left: `${hoveredPanelPos[0]}px`,
      top: `${hoveredPanelPos[1] - 4}px`,
    });

  const mediaContent = {} as TInfoPanelContentItem;
  if (this.viewParams.mediaType === EMediaType.image)
    mediaContent.image = this.viewParams.mediaContent(this.hoveredNode.id);
  else if (this.viewParams.mediaType === EMediaType.text)
    mediaContent.text = this.viewParams.mediaContent(this.hoveredNode.id);

  this.hoveredPanel.setContent({
    themeColor: '#FFFC85',
    hasBorder: false,
    flex: true,
    flexDirection: reverse ? 'row-reverse' : 'row',
    content: [{ title: `No. ${this.hoveredNode.id}` }, mediaContent],
  });
}
