import HnswOverview from '.';

export default async function updateStaticPanel(this: HnswOverview) {
  this.staticPanel.setContent({
    themeColor: '#FFFFFF',
    hasBorder: true,
    content: [
      {
        title: 'HNSW',
      },
      { text: `M = ${this.M}, ef_construction = ${this.efConstruction}` },
      {
        text: `${this.ntotal} vectors, ${this.nlevels}-layer hierarchical graph (only visual the top-${this.overviewNodesLevels.length} layers).`,
      },
      ...this.nodesCount
        .map((c, level) => {
          return {
            title: `Level ${level}`,
            text: `${c} vectors, ${this.linksCount[level]} links`,
          };
        })
        .reverse(),
    ],
  });
}
