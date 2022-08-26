import * as d3 from 'd3';
import { TCoord, TId } from 'Types';
import { TSearchRecordsIvfflat } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatSearchViewCluster,
  TVisDataIvfflatSearchViewNode,
} from 'Types/visData';
import { getPercentile } from 'Utils';

export const ivfflatSearchViewLayoutFinePolar = ({
  searchViewClusters,
  searchRecords,
  layoutParams,
  polarOrigin,
  polarMaxR,
}: {
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  searchRecords: TSearchRecordsIvfflat;
  layoutParams: TLayoutParamsIvfflat;
  polarOrigin: TCoord;
  polarMaxR: number;
}) =>
  new Promise<TVisDataIvfflatSearchViewNode[]>((resolve) => {
    const { numForceIterations, nonTopKNodeR, canvasScale } = layoutParams;

    const clusterId2cluster = {} as {
      [clusterId: TId]: TVisDataIvfflatSearchViewCluster;
    };
    searchViewClusters.forEach(
      (cluster) => (clusterId2cluster[cluster.clusterId] = cluster)
    );

    const searchViewNodes = searchRecords.fineSearchRecords.map(
      ({ id, clusterId, distance }) => ({ id, clusterId, distance })
    ) as TVisDataIvfflatSearchViewNode[];
    searchViewNodes.sort((a, b) => a.distance - b.distance);

    // distance scale
    const minDis = getPercentile(searchViewNodes, 'clusterId', 0);
    const maxDis = getPercentile(searchViewNodes, 'clusterId', 0.97);
    const r = d3
      .scaleLinear()
      .domain([minDis, maxDis])
      .range([polarMaxR * 0.2, polarMaxR])
      .clamp(true);

    searchViewNodes.forEach((node) => {
      const cluster = clusterId2cluster[node.clusterId];
      const { polarOrder, SVNextLevelPos } = cluster;
      node.polarOrder = polarOrder;
      const randAngle = Math.random() * Math.PI * 2;
      const randBias = [Math.sin, Math.cos].map(
        (f) => cluster.r * Math.random() * 0.7 * f(randAngle)
      );
      node.voronoiPos = SVNextLevelPos.map((d, i) => d + randBias[i]) as TCoord;
      node.x = node.voronoiPos[0];
      node.y = node.voronoiPos[1];
      node.r = r(node.distance);
    });

    const simulation = d3
      .forceSimulation(searchViewNodes)
      .alphaDecay(1 - Math.pow(0.001, (1 / numForceIterations) * 2))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((_) => nonTopKNodeR * canvasScale)
          .strength(0.4)
      )
      .force(
        'r',
        d3
          .forceRadial(
            (node: TVisDataIvfflatSearchViewNode) => node.r,
            ...polarOrigin
          )
          .strength(1)
      )
      .on('end', () => {
        searchViewNodes.forEach((node) => {
          node.polarPos = [node.x, node.y];
        });
        resolve(searchViewNodes);
      });
  });

export default ivfflatSearchViewLayoutFinePolar;
