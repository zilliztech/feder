import renderBackground from './renderBackground';
import renderNormalVoronoi from './renderNormalVoronoi';
import renderHighlightVoronoi from './renderHighlightVoronoi';
import renderSelectedVoronoi from './renderSelectedVoronoi';
import renderTarget from './renderTarget';
import { VIEW_TYPE, SEARCH_VIEW_TYPE } from 'Types';

export default function renderVoronoiView(
  ctx,
  viewType,
  layoutData,
  federView,
  hoveredCluster = null,
) {
  // background
  renderBackground(ctx, federView);

  // normal-cluster
  renderNormalVoronoi(ctx, viewType, layoutData, federView);

  // nprobe-cluster   search
  viewType === VIEW_TYPE.search &&
    renderHighlightVoronoi(ctx, layoutData, federView);

  // hoverCluster
  !!hoveredCluster &&
    renderSelectedVoronoi(ctx, viewType, hoveredCluster, federView);

  // target           search
  viewType === VIEW_TYPE.search && renderTarget(ctx, SEARCH_VIEW_TYPE.voronoi, layoutData, federView);
}
