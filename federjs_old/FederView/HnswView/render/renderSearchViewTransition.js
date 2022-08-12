import * as d3 from 'd3';
import renderBackground from './renderBackground';
import renderlevelLayer from './renderlevelLayer';
import renderSearchViewLinks from './renderSearchViewLinks';
import renderSearchViewInterLevelLinks from './renderSearchViewInterLevelLinks';
import renderSearchViewNodes from './renderSearchViewNodes';
import renderSearchViewTarget from './renderSearchViewTarget';
import renderSelectedNode from './renderSelectedNode';
import renderHoveredPanelLine from './renderHoveredPanelLine';
import {
  getNodeIdWithLevel,
  getLinkIdWithLevel,
  getEntryLinkIdWithLevel,
} from 'Utils';

export default function renderSearchViewTransition(
  ctx,
  {
    searchNodesLevels,
    searchLinksLevels,
    searchLayerPosLevels,
    searchNodeShowTime,
    searchLinkShowTime,
    searchTarget,
    searchTargetShowTime,
    entryNodesLevels,

    clickedLevel,
    clickedNode,
    hoveredLevel,
    hoveredNode,
  },
  federView,
  { t, p }
) {
  const {
    searchIntraLevelTime,
    searchInterLevelTime,
    width,
    padding,
    canvasScale,
  } = federView;
  renderBackground(ctx, federView);

  for (let level = 0; level < searchNodesLevels.length; level++) {
    renderlevelLayer(ctx, searchLayerPosLevels[level], federView);
    const nodes = searchNodesLevels[level].filter(
      (node) => searchNodeShowTime[getNodeIdWithLevel(node.id, level)] < t
    );
    const links = searchLinksLevels[level].filter(
      (link) =>
        searchLinkShowTime[
          getLinkIdWithLevel(link.source.id, link.target.id, level)
        ] +
          searchIntraLevelTime <
        t
    );
    const inProcessLinks = searchLinksLevels[level]
      .filter(
        (link) =>
          searchLinkShowTime[
            getLinkIdWithLevel(link.source.id, link.target.id, level)
          ] < t &&
          searchLinkShowTime[
            getLinkIdWithLevel(link.source.id, link.target.id, level)
          ] +
            searchIntraLevelTime >=
            t
      )
      .map((link) => ({
        t:
          (t -
            searchLinkShowTime[
              getLinkIdWithLevel(link.source.id, link.target.id, level)
            ]) /
          searchIntraLevelTime,
        link,
      }));
    const entryNodes =
      level === entryNodesLevels.length - 1
        ? []
        : entryNodesLevels[level].filter(
            (entryNode) =>
              searchLinkShowTime[getEntryLinkIdWithLevel(entryNode.id, level)] +
                searchInterLevelTime <
              t
          );
    const inprocessEntryNodes =
      level === entryNodesLevels.length - 1
        ? []
        : entryNodesLevels[level]
            .filter(
              (entryNode) =>
                searchLinkShowTime[
                  getEntryLinkIdWithLevel(entryNode.id, level)
                ] < t &&
                searchLinkShowTime[
                  getEntryLinkIdWithLevel(entryNode.id, level)
                ] +
                  searchInterLevelTime >=
                  t
            )
            .map((node) => ({
              node,
              t:
                (t -
                  searchLinkShowTime[getEntryLinkIdWithLevel(node.id, level)]) /
                searchInterLevelTime,
            }));
    renderSearchViewLinks(ctx, { links, inProcessLinks, level }, federView);
    // console.log(level, entryNodes);
    renderSearchViewInterLevelLinks(
      ctx,
      {
        entryNodes,
        inprocessEntryNodes,
        searchTarget,
        level,
      },
      federView
    );
    renderSearchViewNodes(ctx, { nodes, level }, federView);

    searchTargetShowTime[level] < t &&
      renderSearchViewTarget(ctx, { node: searchTarget, level }, federView);

    if (!!hoveredNode) {
      const [x, y] = hoveredNode.searchViewPosLevels[hoveredLevel];
      const originX = (width - padding[1] - padding[3]) / 2 + padding[3];
      const isLeft = originX > x;

      renderHoveredPanelLine(ctx, { x, y, isLeft }, federView);
    }

    if (!!clickedNode) {
      renderSelectedNode(
        ctx,
        {
          pos: clickedNode.searchViewPosLevels[clickedLevel],
          r: clickedNode.r + 2 * canvasScale,
        },
        federView
      );
    }
  }
}
