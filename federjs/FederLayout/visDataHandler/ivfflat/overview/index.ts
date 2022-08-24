import { TIndexMetaIvfflat } from 'Types/indexMeta';
import { getProjector } from 'FederLayout/projector';
import { EProjectMethod, TCoord, TVec } from 'Types';
import * as d3 from 'd3';
import {
  TVisDataIvfflatOverviewCluster,
  TLayoutParamsIvfflat,
} from 'Types/visData';
import getVoronoi from '../getVoronoi';

export const IvfflatOverviewLayout = (
  indexMeta: TIndexMetaIvfflat,
  layoutParams: TLayoutParamsIvfflat
): Promise<TVisDataIvfflatOverviewCluster[]> => {
  const {
    width = 800,
    height = 480,
    canvasScale = 2,
    coarseSearchWithProjection = true,
    projectMethod = EProjectMethod.umap,
    projectParams = {},
    minVoronoiRadius = 5,
    numForceIterations = 100,
  } = layoutParams;
  return new Promise((resolve) => {
    const { nlist, ntotal } = indexMeta;
    const projector = coarseSearchWithProjection
      ? getProjector({
          method: projectMethod,
          params: projectParams,
        })
      : (vecs: TVec[]) =>
          vecs.map((_) => [Math.random(), Math.random()] as TCoord);
    const centroidProjectPos = projector(
      indexMeta.clusters.map((cluster) => cluster.centroidVector)
    );

    const canvasWidth = width * canvasScale;
    const canvasHeight = height * canvasScale;
    const allArea = canvasWidth * canvasHeight;
    const clusters = indexMeta.clusters.map(({ clusterId, ids }, i) => ({
      clusterId,
      ids,
      oriProjection: centroidProjectPos[i],
      count: ids.length,
      countP: ids.length / ntotal,
      countArea: (allArea * ids.length) / ntotal,
    })) as TVisDataIvfflatOverviewCluster[];

    const x = d3
      .scaleLinear()
      .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[0]))
      .range([0, canvasWidth]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[1]))
      .range([0, canvasHeight]);

    clusters.forEach((cluster) => {
      cluster.x = x(cluster.oriProjection[0]);
      cluster.y = y(cluster.oriProjection[1]);
      cluster.r = Math.max(
        minVoronoiRadius * canvasScale,
        Math.sqrt(cluster.countArea / Math.PI)
      );
    });

    const simulation = d3
      .forceSimulation(clusters)
      .alphaDecay(1 - Math.pow(0.001, 1 / numForceIterations))
      .force(
        'collision',
        d3
          .forceCollide()
          .radius((cluster: TVisDataIvfflatOverviewCluster) => cluster.r)
      )
      .force('center', d3.forceCenter(canvasWidth / 2, canvasHeight / 2))
      .on('tick', () => {
        // border
        clusters.forEach((cluster) => {
          cluster.x = Math.max(
            cluster.r,
            Math.min(canvasWidth - cluster.r, cluster.x)
          );
          cluster.y = Math.max(
            cluster.r,
            Math.min(canvasHeight - cluster.r, cluster.y)
          );
        });
      })
      .on('end', () => {
        clusters.forEach((cluster) => {
          cluster.forceProjection = [cluster.x, cluster.y];
        });
        const voronoi = getVoronoi(clusters, canvasWidth, canvasHeight);
        clusters.forEach((cluster, i) => {
          const points = voronoi.cellPolygon(i);
          points.pop();
          cluster.OVPolyPoints = points;
          cluster.OVPolyCentroid = d3.polygonCentroid(points);
        });
        resolve(clusters);
      });
  });
};

export default IvfflatOverviewLayout;
