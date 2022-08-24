import * as d3 from 'd3';
import { TVisDataIvfflatOverviewCluster } from 'Types/visData';

export default function getVoronoi(
  clusters: TVisDataIvfflatOverviewCluster[],
  width: number,
  height: number
) {
  const delaunay = d3.Delaunay.from(
    clusters.map((cluster) => [cluster.x, cluster.y])
  );
  const voronoi = delaunay.voronoi([0, 0, width, height]);
  return voronoi;
}
