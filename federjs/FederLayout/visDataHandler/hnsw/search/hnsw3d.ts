import { TSearchRecordsHnsw } from 'Types/searchRecords';
import { EHnswLinkType, TCoord } from 'Types';
import parseVisRecords from './parseVisRecords';
import forceSearchView from './forceSearchView';
import transformHandler from './transformHandler';
import * as d3 from 'd3';

export const searchViewLayoutHandler3d = async (
  searchRecords: TSearchRecordsHnsw,
  layoutParams: any
) => {
  const visData = parseVisRecords(searchRecords);
  const {
    targetR,
    canvasScale = 1,
    targetOrigin,
    searchViewNodeBasicR,
    forceIterations,
  } = layoutParams;

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
    layoutParams.levelCount,
    layoutParams
  );

  const searchTarget = {
    id: 'target',
    r: targetR * canvasScale,
    searchViewPosLevels: d3
      .range(visData.length)
      .map((i) => transformFunc(...(targetOrigin as TCoord), i)),
  };

  searchNodesLevels.forEach((nodes, level) => {
    nodes.forEach((node) => {
      node.searchViewPosLevels = d3
        .range(level + 1)
        .map((i) => transformFunc(...(node.forcePos as TCoord), i));
      node.r = (searchViewNodeBasicR + node.type * 0.5) * canvasScale;
    });
  });

  const id2searchNode = {};
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => (id2searchNode[node.id] = node))
  );

  const searchLinksLevels = parseVisRecords(searchRecords).map((levelData) =>
    levelData.links.filter((link) => link.type !== EHnswLinkType.None)
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

  return {
    visData,
    id2forcePos,
    searchTarget,
    entryNodesLevels,
    searchNodesLevels,
    searchLinksLevels,
    searchRecords
  };
};
