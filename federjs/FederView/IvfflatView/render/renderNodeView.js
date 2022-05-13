import renderBackground from './renderBackground';
import renderPolarAxis from './renderPolarAxis';
import renderNormalNodes from './renderNormalNodes';
import renderHighLightNodes from './renderHighLightNodes';
import renderSelectedNode from './renderSelectedNode';
import renderTarget from './renderTarget';
import { SEARCH_VIEW_TYPE } from 'Types';

export default function renderNodeView() {
  // background
  renderBackground(this);

  // axis     polar
  this.searchViewType === SEARCH_VIEW_TYPE.polar && renderPolarAxis(this);

  // normal-nodes
  renderNormalNodes(this);

  // topk-nodes
  renderHighLightNodes(this);

  // hovered node
  !!this.hoveredNode && renderSelectedNode(this);

  // target
  renderTarget(this);
}
