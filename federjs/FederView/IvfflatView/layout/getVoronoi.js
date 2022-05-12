import * as d3 from 'd3';

export default function getVoronoi(clusters, width, height) {
  const delaunay = d3.Delaunay.from(
    clusters.map((cluster) => [cluster.x, cluster.y])
  );
  const voronoi = delaunay.voronoi([0, 0, width, height]);
  return voronoi;
}
