import * as d3 from 'd3';
import parseVisRecords from './parseVisRecords';
import forceSearchView from './forceSearchView';
import transformHandler from './transformHandler';
import computeSearchViewTransition from './computeSearchViewTransition';
import { HNSW_LINK_TYPE, HNSW_NODE_TYPE } from 'Types';

export default async function searchViewLayoutHandler(searchRes, federView) {
  const {
    targetR,
    canvasScale,
    targetOrigin,
    searchViewNodeBasicR,
    searchInterLevelTime,
    searchIntraLevelTime,
    forceIterations,
  } = federView;

  const visData = parseVisRecords(searchRes);

  const id2forcePos = await forceSearchView(
    visData,
    targetOrigin,
    forceIterations
  );

  const searchNodesLevels = visData.map((levelData) => levelData.nodes);
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => {
      node.forcePos = id2forcePos[node.id];
      node.x = node.forcePos[0];
      node.y = node.forcePos[1];
    })
  );
  const { layerPosLevels, transformFunc } = transformHandler(
    searchNodesLevels.reduce((acc, node) => acc.concat(node), []),
    federView
  );

  const searchTarget = {
    id: 'target',
    r: targetR * canvasScale,
    searchViewPosLevels: d3
      .range(visData.length)
      .map((i) => transformFunc(...targetOrigin, i)),
  };

  searchNodesLevels.forEach((nodes, level) => {
    nodes.forEach((node) => {
      node.searchViewPosLevels = d3
        .range(level + 1)
        .map((i) => transformFunc(...node.forcePos, i));
      node.r = (searchViewNodeBasicR + node.type * 0.5) * canvasScale;
    });
  });

  const id2searchNode = {};
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => (id2searchNode[node.id] = node))
  );

  const searchLinksLevels = parseVisRecords(searchRes).map((levelData) =>
    levelData.links.filter((link) => link.type !== HNSW_LINK_TYPE.None)
  );
  searchLinksLevels.forEach((levelData) =>
    levelData.forEach((link) => {
      const sourceId = link.source;
      const targetId = link.target;
      const sourceNode = id2searchNode[sourceId];
      const targetNode = id2searchNode[targetId];
      link.source = sourceNode;
      link.target = targetNode;
    })
  );

  const entryNodesLevels = visData.map((levelData) =>
    levelData.entryIds.map((id) => id2searchNode[id])
  );

  const { targetShowTime, nodeShowTime, linkShowTime, duration } =
    computeSearchViewTransition({
      linksLevels: searchLinksLevels,
      entryNodesLevels,
      interLevelGap: searchInterLevelTime,
      intraLevelGap: searchIntraLevelTime,
    });

  return {
    visData,
    id2forcePos,
    searchTarget,
    entryNodesLevels,
    searchNodesLevels,
    searchLinksLevels,
    searchLayerPosLevels: layerPosLevels,
    searchTargetShowTime: targetShowTime,
    searchNodeShowTime: nodeShowTime,
    searchLinkShowTime: linkShowTime,
    searchTransitionDuration: duration,
    searchParams: searchRes.searchParams,
  };
}
