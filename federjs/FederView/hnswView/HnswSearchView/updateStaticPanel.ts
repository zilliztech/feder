import * as d3 from 'd3';
import { TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType, TId } from 'Types';
import HnswSearchView from '.';

export default async function updateStaticPanel(this: HnswSearchView) {
  const { targetMedia } = this.actionData;
  let mediaContent = null;
  if (!!targetMedia) {
    mediaContent = {} as TInfoPanelContentItem;
    if (this.viewParams.mediaType === EMediaType.image)
      mediaContent.image = targetMedia;
    else if (this.viewParams.mediaType === EMediaType.text)
      mediaContent.text = targetMedia;
  }
  const ntotalContent = {
    text: `${this.ntotal} vectors, including ${this.searchNodesLevels.length} layers.`,
  };
  const metaContent = {
    text: `M = ${this.M}, ef_contruction = ${this.efConstruction}.`,
  };
  const searchParamsContent = {
    text: `k = ${this.searchParams.k}, ef_search = ${this.searchParams.ef}.`,
  };
  const numVisitedVector = Array.from(
    new Set(
      this.searchNodesLevels.reduce(
        (acc, nodes) => acc.concat(nodes.map((node) => node.id)),
        [] as TId[]
      )
    )
  ).length;
  const statisticsContent = {
    text: `${numVisitedVector} vectors were visited during search.`,
  };
  const searchDetailContent = this.searchNodesLevels
    .map((nodes, i) => {
      const part1 = {
        title: `Level ${i}`,
        text: `min-dist: ${d3.min(nodes, (node) => node.dist).toFixed(3)}`,
      };
      const part2 = {
        text:
          `${nodes.length} / ${this.nodesCount[i]} vectors, ` +
          `${this.searchLinksLevels[i].length} / ${this.linksCount[i]} links.`,
      };
      return [part1, part2];
    })
    .reverse()
    .reduce((acc, cur) => acc.concat(cur), []);
  this.staticPanel.setContent({
    themeColor: '#FFFFFF',
    hasBorder: true,
    content: [
      { title: 'HNSW - Search' },
      mediaContent,
      metaContent,
      searchParamsContent,
      ntotalContent,
      statisticsContent,
      ...searchDetailContent,
    ].filter((a) => a),
  });
}
