import renderBackground from './renderBackground';
import renderNormalVoronoi from './renderNormalVoronoi';
import renderHighlightVoronoi from './renderHighlightVoronoi';
import renderSelectedVoronoi from './renderSelectedVoronoi';
import renderTarget from './renderTarget';
import { VIEW_TYPE } from 'Types';

export default function renderVoronoiView() {
  // background
  renderBackground(this);

  // normal-cluster
  renderNormalVoronoi(this);

  // nprobe-cluster   search
  this.viewType === VIEW_TYPE.search && renderHighlightVoronoi(this);

  // hoverCluster
  !!this.hoveredCluster && renderSelectedVoronoi(this);

  // target           search
  this.viewType === VIEW_TYPE.search && renderTarget(this);
}
