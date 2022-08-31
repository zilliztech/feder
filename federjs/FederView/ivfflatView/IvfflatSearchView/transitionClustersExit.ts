import { drawPolygons, hexWithOpacity } from 'FederView/renderUtils2D';
import { TCoord } from 'Types';
import { vecAdd } from 'Utils/distFunc';
import IvfflatSearchView from '.';

export default function transitionClustersExit(
  this: IvfflatSearchView,
  t: number,
  reverse: boolean = false
) {
  if (t < 0) return;
  const {
    transitionClustersExitTime,
    transitionReplaceTime,
    nprobeClusterFill,
    nprobeClusterOpacity,
    nprobeClusterStroke,
    nprobeClusterStrokeWidth,
    nonNprobeClusterFill,
    nonNprobeClusterOpacity,
    nonNprobeClusterStroke,
    nonNprobeClusterStrokeWidth,
    canvasScale,
  } = this.viewParams;
  if (t > transitionClustersExitTime + transitionReplaceTime) return;

  t = reverse ? transitionClustersExitTime + transitionReplaceTime - t : t;

  if (t < transitionClustersExitTime) {
    const p = t / transitionClustersExitTime;

    // non-nprobe
    const opacity = nonNprobeClusterOpacity * (1 - p);
    drawPolygons({
      ctx: this.ctx,
      pointsList: this.searchViewClusters
        .filter((cluster) => !cluster.inNprobe)
        .map((cluster) => cluster.SVPolyPoints),
      hasFill: true,
      fillStyle: hexWithOpacity(nonNprobeClusterFill, opacity),
      hasStroke: true,
      strokeStyle: nonNprobeClusterStroke,
      lineWidth: nonNprobeClusterStrokeWidth * canvasScale,
    });

    // nporbe
    const pointsList = this.searchViewClusters
      .filter((cluster) => cluster.inNprobe)
      .map((cluster) => {
        const trans = cluster.SVNextLevelTran.map((d) => d * p);
        return cluster.SVPolyPoints.map(
          (point) => vecAdd(point, trans) as TCoord
        );
      });
    drawPolygons({
      ctx: this.ctx,
      pointsList,
      hasFill: true,
      fillStyle: hexWithOpacity(nprobeClusterFill, nprobeClusterOpacity),
      hasStroke: true,
      strokeStyle: nprobeClusterStroke,
      lineWidth: nprobeClusterStrokeWidth * canvasScale,
    });
  } else {
    const p = (t - transitionClustersExitTime) / transitionReplaceTime;
    const opacity = nprobeClusterOpacity * (1 - p);
    drawPolygons({
      ctx: this.ctx,
      pointsList: this.searchViewClusters
        .filter((cluster) => cluster.inNprobe)
        .map((cluster) =>
          cluster.SVPolyPoints.map(
            (point) => vecAdd(point, cluster.SVNextLevelTran) as TCoord
          )
        ),
      hasFill: true,
      fillStyle: hexWithOpacity(nprobeClusterFill, opacity),
      hasStroke: true,
      strokeStyle: nprobeClusterStroke,
      lineWidth: nprobeClusterStrokeWidth * canvasScale,
    });
  }
}
