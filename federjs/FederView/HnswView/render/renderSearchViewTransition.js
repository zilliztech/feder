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

export default function renderSearchViewTransition({ t, p }) {
  renderBackground(this);

  for (let level = 0; level < this.searchNodesLevels.length; level++) {
    renderlevelLayer({
      ...this,
      points: this.searchLayerPosLevels[level],
    });
    const nodes = this.searchNodesLevels[level].filter(
      (node) => this.searchNodeShowTime[getNodeIdWithLevel(node.id, level)] < t
    );
    const links = this.searchLinksLevels[level].filter(
      (link) =>
        this.searchLinkShowTime[
          getLinkIdWithLevel(link.source.id, link.target.id, level)
        ] +
          this.searchIntraLevelTime <
        t
    );
    const inProcessLinks = this.searchLinksLevels[level]
      .filter(
        (link) =>
          this.searchLinkShowTime[
            getLinkIdWithLevel(link.source.id, link.target.id, level)
          ] < t &&
          this.searchLinkShowTime[
            getLinkIdWithLevel(link.source.id, link.target.id, level)
          ] +
            this.searchIntraLevelTime >=
            t
      )
      .map((link) => ({
        t:
          (t -
            this.searchLinkShowTime[
              getLinkIdWithLevel(link.source.id, link.target.id, level)
            ]) /
          this.searchIntraLevelTime,
        link,
      }));
    const entryNodes =
      level === this.entryNodesLevels.length - 1
        ? []
        : this.entryNodesLevels[level].filter(
            (entryNode) =>
              this.searchLinkShowTime[
                getEntryLinkIdWithLevel(entryNode.id, level)
              ] +
                this.searchInterLevelTime <
              t
          );
    const inprocessEntryNodes =
      level === this.entryNodesLevels.length - 1
        ? []
        : this.entryNodesLevels[level]
            .filter(
              (entryNode) =>
                this.searchLinkShowTime[
                  getEntryLinkIdWithLevel(entryNode.id, level)
                ] < t &&
                this.searchLinkShowTime[
                  getEntryLinkIdWithLevel(entryNode.id, level)
                ] +
                  this.searchInterLevelTime >=
                  t
            )
            .map((node) => ({
              node,
              t:
                (t -
                  this.searchLinkShowTime[
                    getEntryLinkIdWithLevel(node.id, level)
                  ]) /
                this.searchInterLevelTime,
            }));
    const searchTarget = this.searchTarget;
    renderSearchViewLinks({ ...this, links, inProcessLinks, level });
    // console.log(level, entryNodes);
    renderSearchViewInterLevelLinks({
      ...this,
      entryNodes,
      inprocessEntryNodes,
      searchTarget,
      level,
    });
    renderSearchViewNodes({ ...this, nodes, level });

    this.searchTargetShowTime[level] < t &&
      renderSearchViewTarget({ ...this, node: this.searchTarget, level });

    if (!!this.hoveredNode) {
      const [x, y] = this.hoveredNode.searchViewPosLevels[this.hoveredLevel];
      const originX =
        (this.width - this.padding[1] - this.padding[3]) / 2 + this.padding[3];
      const isLeft = originX > x;

      renderHoveredPanelLine({ ...this, x, y, isLeft });
    }

    if (!!this.clickedNode) {
      renderSelectedNode({
        ...this,
        pos: this.clickedNode.searchViewPosLevels[this.clickedLevel],
        r: this.clickedNode.r + 2 * this.canvasScale,
      });
    }
  }
}
