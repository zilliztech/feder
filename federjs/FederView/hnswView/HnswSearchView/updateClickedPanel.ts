import { TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType } from 'Types';
import HnswSearchView from '.';

export default async function updateClickedPanel(this: HnswSearchView) {
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

  const vector = await this.viewParams.getVectorById(node.id);
  const vectorString = vector.map((v) => v.toFixed(6)).join(', ');

  this.clickedPanel.setContent({
    themeColor: '#FFFC85',
    hasBorder: true,
    content: [
      { title: `Level ${this.clickedLevel}` },
      { text: `Row No. ${node.id}` },
      { text: `Distance: ${node.dist.toFixed(3)}` },
      mediaContent,
      { title: `Vector:` },
      { text: vectorString },
    ],
  });
}
