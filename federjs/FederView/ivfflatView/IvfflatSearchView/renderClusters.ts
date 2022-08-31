import { drawPolygons, hexWithOpacity } from 'FederView/renderUtils2D';
import IvfflatSearchView from '.';

export default function renderClusters(this: IvfflatSearchView) {
  const {
    canvasScale,
    nonNprobeClusterFill,
    nonNprobeClusterOpacity,
    nonNprobeClusterStroke,
    nonNprobeClusterStrokeWidth,
    nprobeClusterFill,
    nprobeClusterOpacity,
    nprobeClusterStroke,
    nprobeClusterStrokeWidth,
    hoveredClusterFill,
    hoveredClusterOpacity,
    hoveredClusterStroke,
    hoveredClusterStrokeWidth,
  } = this.viewParams;

  // non-nprobe
  const nonNprobeClusters = this.searchViewClusters.filter(
    (cluster) => !cluster.inNprobe
  );
  drawPolygons({
    ctx: this.ctx,
    pointsList: nonNprobeClusters.map((cluster) => cluster.SVPolyPoints),
    hasFill: true,
    fillStyle: hexWithOpacity(nonNprobeClusterFill, nonNprobeClusterOpacity),
    hasStroke: true,
    strokeStyle: nonNprobeClusterStroke,
    lineWidth: nonNprobeClusterStrokeWidth * canvasScale,
  });

  // nprobe
  const nprobeClusters = this.searchViewClusters.filter(
    (cluster) => cluster.inNprobe
  );
  drawPolygons({
    ctx: this.ctx,
    pointsList: nprobeClusters.map((cluster) => cluster.SVPolyPoints),
    hasFill: true,
    fillStyle: hexWithOpacity(nprobeClusterFill, nprobeClusterOpacity),
    hasStroke: true,
    strokeStyle: nprobeClusterStroke,
    lineWidth: nprobeClusterStrokeWidth * canvasScale,
  });

  // hover
  this.hoveredCluster &&
    drawPolygons({
      ctx: this.ctx,
      pointsList: [this.hoveredCluster.SVPolyPoints],
      hasFill: true,
      fillStyle: hexWithOpacity(hoveredClusterFill, hoveredClusterOpacity),
      hasStroke: true,
      strokeStyle: hoveredClusterStroke,
      lineWidth: hoveredClusterStrokeWidth * canvasScale,
    });
}
