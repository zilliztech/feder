import renderBackground from './renderBackground';
import renderPolarAxis from './renderPolarAxis';
import renderNormalNodes from './renderNormalNodes';
import renderHighLightNodes from './renderHighLightNodes';
import renderSelectedNode from './renderSelectedNode';
import renderTarget from './renderTarget';
import { SEARCH_VIEW_TYPE } from 'Types';

export default function renderNodeView(
  ctx,
  searchViewLayoutData,
  federView,
  searchViewType = SEARCH_VIEW_TYPE.polar,
  hoveredNode = null
) {
  // background
  renderBackground(ctx, federView);

  // axis     polar
  searchViewType === SEARCH_VIEW_TYPE.polar &&
    renderPolarAxis(ctx, searchViewLayoutData, federView);

  // normal-nodes
  renderNormalNodes(ctx, searchViewLayoutData, federView, searchViewType);

  // topk-nodes
  renderHighLightNodes(ctx, searchViewLayoutData, federView, searchViewType);

  // hovered node
  !!hoveredNode &&
    renderSelectedNode(
      ctx,
      searchViewLayoutData,
      federView,
      searchViewType,
      hoveredNode
    );

  // target
  renderTarget(ctx, searchViewType, searchViewLayoutData, federView);
}
