import * as d3 from 'd3';
import IvfflatOverview from '.';

export default async function updateStaticPanel(this: IvfflatOverview) {
  const maxCount = d3.max(this.overviewClusters, (cluster) => cluster.count);
  const minCount = d3.min(this.overviewClusters, (cluster) => cluster.count);
  this.staticPanel.setContent({
    themeColor: '#FFFFFF',
    hasBorder: true,
    content: [
      { title: 'IVFFlat' },
      {
        text: `${this.ntotal} vectors, divided into ${this.nlist} clusters.`,
      },
      {
        text: `The largest cluster has ${maxCount} vectors and the smallest cluster has only ${minCount} vectors.`,
      },
    ],
  });
}
