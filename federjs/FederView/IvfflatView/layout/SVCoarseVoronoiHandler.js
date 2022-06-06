import * as d3 from 'd3';
import getVoronoi from './getVoronoi';
import { vecSort } from 'Utils';

export default function SVCoarseVoronoiHandler() {
  return new Promise((resolve) => {
    const width = this.width;
    const height = this.height;
    const clusters = this.clusters;

    const fineClusterOrder = vecSort(
      this.nprobeClusters,
      'OVPolyCentroid',
      'clusterId'
    );
    // console.log('fineClusterOrder', fineClusterOrder);

    const targetClusterId = this.searchRes.coarse[0].id;
    const targetCluster = clusters.find(
      (cluster) => cluster.clusterId === targetClusterId
    );
    const otherFineClustersId = fineClusterOrder.filter(
      (clusterId) => clusterId !== targetClusterId
    );
    const links = otherFineClustersId.map((clusterId) => ({
      source: clusterId,
      target: targetClusterId,
    }));
    clusters.forEach((cluster) => {
      cluster.x = cluster.forceProjection[0];
      cluster.y = cluster.forceProjection[1];
    });
    const targetClusterX =
      this.nprobeClusters.reduce((acc, cluster) => acc + cluster.x, 0) /
      this.nprobe;
    const targetClusterY =
      this.nprobeClusters.reduce((acc, cluster) => acc + cluster.y, 0) /
      this.nprobe;
    targetCluster.x = targetClusterX;
    targetCluster.y = targetClusterY;

    const otherFineCluster = otherFineClustersId.map((clusterId) =>
      this.nprobeClusters.find((cluster) => cluster.clusterId === clusterId)
    );
    const angleStep = (2 * Math.PI) / (this.nprobe - 1);
    const biasR = targetCluster.r * 0.5;
    otherFineCluster.forEach((cluster, i) => {
      cluster.x = targetClusterX + biasR * Math.sin(angleStep * i);
      cluster.y = targetClusterY + biasR * Math.cos(angleStep * i);
    });

    const simulation = d3
      .forceSimulation(clusters)
      .alphaDecay(1 - Math.pow(0.001, 1 / this.forceIterations / 2))
      .force(
        'links',
        d3
          .forceLink(links)
          .id((cluster) => cluster.clusterId)
          .strength((_) => 0.25)
      )
      .force(
        'collision',
        d3
          .forceCollide()
          .radius((cluster) => cluster.r)
          .strength(0.1)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        // border
        clusters.forEach((cluster) => {
          cluster.x = Math.max(
            cluster.r,
            Math.min(width - cluster.r, cluster.x)
          );
          cluster.y = Math.max(
            cluster.r,
            Math.min(height - cluster.r, cluster.y)
          );
        });
      })
      .on('end', () => {
        clusters.forEach((cluster) => {
          cluster.SVPos = [cluster.x, cluster.y];
        });
        const voronoi = getVoronoi(clusters, width, height);
        clusters.forEach((cluster, i) => {
          const points = voronoi.cellPolygon(i);
          points.pop();
          cluster.SVPolyPoints = points;
          cluster.SVPolyCentroid = d3.polygonCentroid(points);
        });
        this.SVVoronoi = voronoi;

        const targetCluster = clusters.find(
          (cluster) => cluster.clusterId === targetClusterId
        );
        const centoid_fineClusters_x =
          this.nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[0],
            0
          ) / this.nprobeClusters.length;
        const centroid_fineClusters_y =
          this.nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[1],
            0
          ) / this.nprobeClusters.length;
        const _x = centoid_fineClusters_x - targetCluster.SVPos[0];
        const _y = centroid_fineClusters_y - targetCluster.SVPos[1];
        const biasR = Math.sqrt(_x * _x + _y * _y);
        const targetNode = {
          SVPos: [
            targetCluster.SVPos[0] + targetCluster.r * 0.4 * (_x / biasR),
            targetCluster.SVPos[1] + targetCluster.r * 0.4 * (_y / biasR),
          ],
        };
        targetNode.isLeft_coarseLevel = targetNode.SVPos[0] < this.width / 2;
        this.targetNode = targetNode;

        const polarOrigin = [
          width / 2 +
            (targetNode.isLeft_coarseLevel ? -1 : 1) *
              this.polarOriginBias *
              width,
          height / 2,
        ];
        // const polarOrigin = [width / 2, height / 2];
        this.polarOrigin = polarOrigin;
        targetNode.polarPos = polarOrigin;
        const polarMaxR = Math.min(width, height) * 0.5 - 5;
        this.polarMaxR = polarMaxR;
        const angleStep = (Math.PI * 2) / fineClusterOrder.length;
        this.nprobeClusters.forEach((cluster) => {
          const order = fineClusterOrder.indexOf(cluster.clusterId);
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
        const clusterId2cluster = {};
        this.nprobeClusters.forEach((cluster) => {
          clusterId2cluster[cluster.clusterId] = cluster;
        });
        this.clusterId2cluster = clusterId2cluster;

        resolve();
      });
  });
}
