import * as d3 from 'd3';
import parseVisRecords from './parseVisRecords';
import forceSearchView from './forceSearchView';
import transformHandler from './transformHandler';
import computeSearchViewTransition from './computeSearchViewTransition';
import { HNSW_LINK_TYPE, HNSW_NODE_TYPE } from 'Types';

export default async function searchViewLayoutHandler({ searchRes }) {
  let visData = [];
  let id2forcePos = {};
  if (searchRes !== this.searchRes) {
    this.searchRes = searchRes;
    visData = parseVisRecords(searchRes);
    this.visData = visData;

    id2forcePos = await forceSearchView(
      this.visData,
      this.targetOrigin,
      this.forceIterations
    );
    this.id2forcePos = id2forcePos;
  } else {
    visData = this.visData;
    id2forcePos = this.id2forcePos;
  }

  const searchNodesLevels = visData.map((levelData) => levelData.nodes);
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => {
      node.forcePos = id2forcePos[node.id];
      node.x = node.forcePos[0];
      node.y = node.forcePos[1];
    })
  );

  const { layerPosLevels, transformFunc } = transformHandler({
    nodes: searchNodesLevels.reduce((acc, node) => acc.concat(node), []),
    levelCount: this.levelCount,
    width: this.width,
    height: this.height,
    padding: this.padding,
  });

  this.targetOrigin = [0, 0];
  this.searchTarget = {
    id: 'target',
    r: this.targetR * this.canvasScale,
    searchViewPosLevels: d3
      .range(visData.length)
      .map((i) => transformFunc(...this.targetOrigin, i)),
  };

  this.searchLayerPosLevels = layerPosLevels;
  searchNodesLevels.forEach((nodes, level) => {
    nodes.forEach((node) => {
      node.searchViewPosLevels = d3
        .range(level + 1)
        .map((i) => transformFunc(...node.forcePos, i));
      node.r = (this.searchViewNodeBasicR + node.type * 0.5) * this.canvasScale;
    });
  });

  this.searchNodesLevels = searchNodesLevels;

  const id2searchNode = {};
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => (id2searchNode[node.id] = node))
  );

  const searchLinksLevels = parseVisRecords(searchRes).map((levelData) =>
    levelData.links.filter((link) => link.type !== HNSW_LINK_TYPE.None)
  );
  searchLinksLevels.forEach((levelData, level) =>
    levelData.forEach((link) => {
      const sourceId = link.source;
      const targetId = link.target;
      const sourceNode = id2searchNode[sourceId];
      const targetNode = id2searchNode[targetId];
      link.source = sourceNode;
      link.target = targetNode;
    })
  );
  this.searchLinksLevels = searchLinksLevels;
  // console.log('searchLinksLevels', this.searchLinksLevels);

  this.entryNodesLevels = visData.map((levelData) =>
    levelData.entryIds.map((id) => id2searchNode[id])
  );

  const { targetShowTime, nodeShowTime, linkShowTime, duration } =
    computeSearchViewTransition({
      linksLevels: this.searchLinksLevels,
      entryNodesLevels: this.entryNodesLevels,
      interLevelGap: this.searchInterLevelTime,
      intraLevelGap: this.searchIntraLevelTime,
    });
  this.searchTargetShowTime = targetShowTime;
  this.searchNodeShowTime = nodeShowTime;
  this.searchLinkShowTime = linkShowTime;
  this.searchTransitionDuration = duration;
}
