import {
  getEntryLinkIdWithLevel,
  getLinkIdWithLevel,
  getNodeIdWithLevel,
} from 'FederLayout/visDataHandler/hnsw/search/utils';
import clearCanvas from 'FederView/clearCanvas';
import renderNodes from './renderNodes';
import HnswSearchView from '.';
import renderLayer from './renderLayer';
import renderLinks from './renderLinks';
import renderInProcessLinks from './renderInProcessLinks';
import renderEntryAndTargetLinks from './renderEntryAndTargetLinks';
import renderTarget from 'FederView/ivfflatView/IvfflatSearchView/renderTarget';
import renderClickedNode from './renderClickedNode';

export default function transitionSearchView(this: HnswSearchView, t: number) {
  clearCanvas.call(this);

  const { searchIntraLevelTime, searchInterLevelTime } = this.viewParams;

  for (let level = 0; level < this.searchNodesLevels.length; level++) {
    const showNodes = this.searchNodesLevels[level].filter(
      (node) => this.searchNodeShowTime[getNodeIdWithLevel(node.id, level)] < t
    );

    const showLinks = this.searchLinksLevels[level].filter(
      (link) =>
        this.searchLinkShowTime[
          getLinkIdWithLevel(link.source, link.target, level)
        ] +
          searchIntraLevelTime <
        t
    );

    const inProcessLinks = this.searchLinksLevels[level].filter((link) => {
      const showTimeStart =
        this.searchLinkShowTime[
          getLinkIdWithLevel(link.source, link.target, level)
        ];
      if (showTimeStart < t && showTimeStart >= t - searchIntraLevelTime) {
        link.inprocessP = (t - showTimeStart) / searchIntraLevelTime;
        return true;
      } else return false;
    });

    const showEntryNodes =
      level === this.searchNodesLevels.length - 1
        ? []
        : this.entryNodesLevels[level].filter(
            (entryNode) =>
              this.searchLinkShowTime[
                getEntryLinkIdWithLevel(entryNode.id, level)
              ] <
              t - searchInterLevelTime
          );

    const inprocessEntryNodes =
      level === this.searchNodesLevels.length - 1
        ? []
        : this.entryNodesLevels[level].filter((entryNode) => {
            const showTime =
              this.searchLinkShowTime[
                getEntryLinkIdWithLevel(entryNode.id, level)
              ];
            if (showTime > t - searchInterLevelTime && showTime < t) {
              entryNode.inProcessP = (t - showTime) / searchInterLevelTime;
              return true;
            } else return false;
          });

    renderLayer.call(this, this.searchLayerPosLevels[level]);
    renderLinks.call(this, showLinks, level);
    renderEntryAndTargetLinks.call(
      this,
      showEntryNodes,
      inprocessEntryNodes,
      level
    );
    renderInProcessLinks.call(this, inProcessLinks, level);
    renderNodes.call(this, showNodes, level);
  }
  renderClickedNode.call(this);
}
