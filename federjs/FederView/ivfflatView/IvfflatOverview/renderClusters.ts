import { drawPolygons, hexWithOpacity } from 'FederView/renderUtils2D';
import IvfflatOverview from '.';

export default function renderClusters(this: IvfflatOverview) {
  const {
    canvasScale,
    nonNprobeClusterFill,
    nonNprobeClusterOpacity,
    nonNprobeClusterStroke,
    nonNprobeClusterStrokeWidth,
    hoveredClusterFill,
    hoveredClusterOpacity,
    hoveredClusterStroke,
    hoveredClusterStrokeWidth,
  } = this.viewParams;

  drawPolygons({
    ctx: this.ctx,
    pointsList: this.overviewClusters.map((cluster) => cluster.OVPolyPoints),
    hasFill: true,
    fillStyle: hexWithOpacity(nonNprobeClusterFill, nonNprobeClusterOpacity),
    hasStroke: true,
    strokeStyle: nonNprobeClusterStroke,
    lineWidth: nonNprobeClusterStrokeWidth * canvasScale,
  });

  // hover
  this.hoveredCluster &&
    drawPolygons({
      ctx: this.ctx,
      pointsList: [this.hoveredCluster.OVPolyPoints],
      hasFill: true,
      fillStyle: hexWithOpacity(hoveredClusterFill, hoveredClusterOpacity),
      hasStroke: true,
      strokeStyle: hoveredClusterStroke,
      lineWidth: hoveredClusterStrokeWidth * canvasScale,
    });
}
