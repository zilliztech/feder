import * as d3 from 'd3';
import getVoronoi from './getVoronoi';

export default function overviewLayoutHandler({ indexMeta }) {
  const width = this.width;
  const height = this.height;
  const allArea = width * height;
  const { ntotal, listCentroidProjections = null, listSizes } = indexMeta;
  const clusters = listSizes.map((listSize, i) => ({
    clusterId: i,
    oriProjection: listCentroidProjections
      ? listCentroidProjections[i]
      : [Math.random(), Math.random()],
    count: listSize,
    countP: listSize / ntotal,
    countArea: allArea * (listSize / ntotal),
  }));

  const x = d3
    .scaleLinear()
    .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[0]))
    .range([0, width]);
  const y = d3
    .scaleLinear()
    .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[1]))
    .range([0, height]);

  clusters.forEach((cluster) => {
    cluster.x = x(cluster.oriProjection[0]);
    cluster.y = y(cluster.oriProjection[1]);
    cluster.r = Math.max(
      this.minVoronoiRadius * this.canvasScale,
      Math.sqrt(cluster.countArea / Math.PI)
    );
  });

  const simulation = d3
    .forceSimulation(clusters)
    .force(
      'collision',
      d3.forceCollide().radius((cluster) => cluster.r)
    )
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', () => {
      // border
      clusters.forEach((cluster) => {
        cluster.x = Math.max(cluster.r, Math.min(width - cluster.r, cluster.x));
        cluster.y = Math.max(
          cluster.r,
          Math.min(height - cluster.r, cluster.y)
        );
      });
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      simulation.stop();
      clusters.forEach((cluster) => {
        cluster.forceProjection = [cluster.x, cluster.y];
      });
      const voronoi = getVoronoi(clusters, width, height);
      clusters.forEach((cluster, i) => {
        const points = voronoi.cellPolygon(i);
        points.pop();
        cluster.OVPolyPoints = points;
        cluster.OVPolyCentroid = d3.polygonCentroid(points);
      });
      resolve({ clusters, voronoi });
    }, this.voronoiForceTime);
  });
}
