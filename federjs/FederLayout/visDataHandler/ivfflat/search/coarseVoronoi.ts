import * as d3 from 'd3';
import { TCoord } from 'Types';
import { TSearchRecordsIvfflat } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatOverviewCluster,
  TVisDataIvfflatSearchViewCluster,
  TVisDataIvfflatSearchViewTargetNode,
} from 'Types/visData';
import getVoronoi from '../getVoronoi';
import { vecSort } from './vecSort';

export const ivfflatSearchViewLayoutCoarseVoronoi = (
  overviewClusters: TVisDataIvfflatOverviewCluster,
  searchRecords: TSearchRecordsIvfflat,
  layoutParams: TLayoutParamsIvfflat
): Promise<{
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  targetNode: TVisDataIvfflatSearchViewTargetNode;
  polarOrigin: TCoord;
  polarMaxR: number;
}> =>
  new Promise(async (resolve) => {
    const { nprobe, k } = searchRecords.searchParams;
    const searchViewClusters = JSON.parse(
      JSON.stringify(overviewClusters)
    ) as TVisDataIvfflatSearchViewCluster[];
    searchViewClusters.forEach((cluster) => {
      cluster.x = cluster.forceProjection[0];
      cluster.y = cluster.forceProjection[1];
    });
    searchRecords.coarseSearchRecords.forEach(
      ({ clusterId, distance }) =>
        (searchViewClusters[clusterId].distance = distance)
    );
    searchRecords.nprobeClusterIds.forEach(
      (nprobeClusterId) => (searchViewClusters[nprobeClusterId].inNprobe = true)
    );
    const nprobeClusters = searchViewClusters.filter(
      (cluster) => cluster.inNprobe
    );
    const nprobeClusterOrder = vecSort(
      nprobeClusters,
      'OVPolyCentroid',
      'clusterId'
    );

    const targetClusterId = searchRecords.coarseSearchRecords[0].clusterId;
    const targetCluster = searchViewClusters.find(
      (cluster) => cluster.clusterId === targetClusterId
    );
    // around the target cluster.
    const notTargetNprobeClusterIds = nprobeClusterOrder.filter(
      (clusterId) => clusterId !== targetClusterId
    );
    const notTargetNprobeClusters = notTargetNprobeClusterIds.map((clusterId) =>
      nprobeClusters.find((cluster) => cluster.clusterId === clusterId)
    );
    const notTargetNprobeClusterLinks = notTargetNprobeClusterIds.map(
      (source) => ({
        source,
        target: targetClusterId,
      })
    );
    const targetClusterX =
      nprobeClusters.reduce((acc, cluster) => acc + cluster.x, 0) / nprobe;
    const targetClusterY =
      nprobeClusters.reduce((acc, cluster) => acc + cluster.y, 0) / nprobe;
    targetCluster.x = targetClusterX;
    targetCluster.y = targetClusterY;

    const angleStep = (2 * Math.PI) / (nprobe - 1);
    const biasR = targetCluster.r * 0.5;
    notTargetNprobeClusters.forEach((cluster, i) => {
      cluster.x = targetClusterX + biasR * Math.sin(angleStep * i);
      cluster.y = targetClusterY + biasR * Math.cos(angleStep * i);
    });

    const { numForceIterations, width, height, canvasScale, polarOriginBias } =
      layoutParams;
    const canvasWidth = width * canvasScale;
    const canvasHeight = height * canvasScale;
    const simulation = d3
      .forceSimulation(searchViewClusters)
      .alphaDecay(1 - Math.pow(0.001, 1 / numForceIterations))
      .force(
        'links',
        d3
          .forceLink(notTargetNprobeClusterLinks)
          .id((cluster: TVisDataIvfflatSearchViewCluster) => cluster.clusterId)
          .strength((_) => 0.25)
      )
      .force(
        'collision',
        d3
          .forceCollide()
          .radius((cluster: TVisDataIvfflatSearchViewCluster) => cluster.r)
          .strength(0.1)
      )
      .force('center', d3.forceCenter(canvasWidth / 2, canvasHeight / 2))
      .on('tick', () => {
        // border
        searchViewClusters.forEach((cluster) => {
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
        searchViewClusters.forEach((cluster) => {
          cluster.SVPos = [cluster.x, cluster.y];
        });
        const voronoi = getVoronoi(
          searchViewClusters,
          canvasWidth,
          canvasHeight
        );
        searchViewClusters.forEach((cluster, i) => {
          const points = voronoi.cellPolygon(i);
          points.pop();
          cluster.SVPolyPoints = points;
          cluster.SVPolyCentroid = d3.polygonCentroid(points);
        });
        // searchViewLayoutData.SVVoronoi = voronoi;

        const targetCluster = searchViewClusters.find(
          (cluster) => cluster.clusterId === targetClusterId
        );
        const centoid_fineClusters_x =
          nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[0],
            0
          ) / nprobe;
        const centroid_fineClusters_y =
          nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[1],
            0
          ) / nprobe;
        const _x = centoid_fineClusters_x - targetCluster.SVPos[0];
        const _y = centroid_fineClusters_y - targetCluster.SVPos[1];
        const biasR = Math.sqrt(_x * _x + _y * _y);
        const targetNode = {
          clusterId: targetClusterId,
          SVPos: [
            targetCluster.SVPos[0] + targetCluster.r * 0.4 * (_x / biasR),
            targetCluster.SVPos[1] + targetCluster.r * 0.4 * (_y / biasR),
          ],
        } as TVisDataIvfflatSearchViewTargetNode;
        targetNode.isLeft_coarseLevel = targetNode.SVPos[0] < canvasWidth / 2;
        // searchViewLayoutData.targetNode = targetNode;

        const polarOrigin = [
          canvasWidth / 2 +
            (targetNode.isLeft_coarseLevel ? -1 : 1) *
              polarOriginBias *
              canvasWidth,
          canvasHeight / 2,
        ] as TCoord;
        // const polarOrigin = [width / 2, height / 2];
        // searchViewLayoutData.polarOrigin = polarOrigin;
        targetNode.polarPos = polarOrigin;
        const polarMaxR = Math.min(canvasWidth, canvasHeight) * 0.5 - 5;
        // searchViewLayoutData.polarMaxR = polarMaxR;
        const angleStep = (Math.PI * 2) / nprobeClusterOrder.length;
        nprobeClusters.forEach((cluster) => {
          const order = nprobeClusterOrder.indexOf(cluster.clusterId);
          cluster.polarOrder = order;
          cluster.SVNextLevelPos = [
            polarOrigin[0] + (polarMaxR / 2) * Math.sin(angleStep * order),
            polarOrigin[1] + (polarMaxR / 2) * Math.cos(angleStep * order),
          ];
          cluster.SVNextLevelTran = [
            cluster.SVNextLevelPos[0] - cluster.SVPolyCentroid[0],
            cluster.SVNextLevelPos[1] - cluster.SVPolyCentroid[1],
          ];
        });
        // const clusterId2cluster = {};
        // nprobeClusters.forEach((cluster) => {
        //   clusterId2cluster[cluster.clusterId] = cluster;
        // });
        // searchViewLayoutData.clusterId2cluster = clusterId2cluster;

        resolve({ searchViewClusters, targetNode, polarOrigin, polarMaxR });
      });
  });

export default ivfflatSearchViewLayoutCoarseVoronoi;
