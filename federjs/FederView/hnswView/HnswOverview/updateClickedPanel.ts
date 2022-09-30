import { parseNodeIdWidthLevel } from "FederLayout/visDataHandler/hnsw/utils";
import { TInfoPanelContentItem } from "FederView/InfoPanel";
import { EMediaType } from "Types";
import HnswOverview from ".";

export default async function updateClickedPanel(this: HnswOverview) {
  const node = this.clickedNode;
  if (!node) {
    this.clickedPanel.setContent({ content: [] });
    return;
  }

  const mediaContent = {} as TInfoPanelContentItem;
  if (this.viewParams.mediaType === EMediaType.image)
    mediaContent.image = this.viewParams.mediaContent(node.id);
  else if (this.viewParams.mediaType === EMediaType.text)
    mediaContent.text = this.viewParams.mediaContent(node.id);

  const pathFromEntryTexts = this.overviewNodesLevels
    .filter((_, level) => {
      return level >= this.clickedLevel;
    })
    .map(
      ({ level }) =>
        `level ${level}: ` +
        node.pathFromEntry
          .filter(
            (idWithLevel) => parseNodeIdWidthLevel(idWithLevel)[0] === level
          )
          .map((idWithLevel) => parseNodeIdWidthLevel(idWithLevel)[1])
          .join(' => ')
    )
    .reverse();

  const linkedNodeText = node.links.join(', ');
  this.clickedPanel.setContent({
    themeColor: '#FFFC85',
    hasBorder: true,
    content: [
      { title: `Level ${node.level}` },
      { title: `Row No. ${node.id}` },
      mediaContent,
      { title: `Shortest path from the entry:` },
      ...pathFromEntryTexts.map((text) => ({ text })),
      { title: `Linked vectors:` },
      { text: linkedNodeText },
    ],
  });
}