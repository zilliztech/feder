import { TSearchRecordsHnsw } from 'Types/searchRecords';
import { EHnswLinkType, TCoord, TId } from 'Types';
import parseVisRecords from './parseVisRecords';
import forceSearchView from './forceSearchView';
import transformHandler from './transformHandler';
import computeSearchViewTransition from './computeSearchViewTransition';
import * as d3 from 'd3';
import {
  TLayoutParamsHnsw,
  TVisDataHnswNode,
  TVisDataHnswParsedDataLevel,
  TVisDataHnswSearchView,
  TVisDataHnswTargetNode,
} from 'Types/visData';

export const searchViewLayoutHandler = async (
  searchRecords: TSearchRecordsHnsw,
  layoutParams: TLayoutParamsHnsw
): Promise<TVisDataHnswSearchView> => {
  const parsedData = parseVisRecords(searchRecords);
  // "links" will be changed by d3.
  const parsedDataCopy = JSON.parse(
    JSON.stringify(parsedData)
  ) as TVisDataHnswParsedDataLevel[];

  const {
    targetR,
    canvasScale = 1,
    targetOrigin,
    searchViewNodeBasicR,
    searchViewNodeRStep,
    searchInterLevelTime,
    searchIntraLevelTime,
    numForceIterations,
  } = layoutParams;

  const id2forcePos = await forceSearchView(
    parsedData,
    targetOrigin,
    numForceIterations
  );

  const searchNodesLevels = parsedData.map((levelData) => levelData.nodes);
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => {
      node.forcePos = id2forcePos[node.id];
      node.x = node.forcePos[0];
      node.y = node.forcePos[1];
    })
  );
  const { layerPosLevels, transformFunc } = transformHandler(
    searchNodesLevels.reduce((acc, node) => acc.concat(node), []),
    searchNodesLevels.length,
    layoutParams
  );

  const searchTarget = {
    id: 'target',
    r: targetR * canvasScale,
    searchViewPosLevels: d3
      .range(parsedData.length)
      .map((i) => transformFunc(...(targetOrigin as TCoord), i)),
  } as TVisDataHnswTargetNode;

  searchNodesLevels.forEach((nodes, level) => {
    nodes.forEach((node) => {
      node.searchViewPosLevels = d3
        .range(level + 1)
        .map((i) => transformFunc(...(node.forcePos as TCoord), i));
      node.r =
        (searchViewNodeBasicR + node.type * searchViewNodeRStep) * canvasScale;
    });
  });

  const id2searchNode = {} as { [id: TId]: TVisDataHnswNode };
  searchNodesLevels.forEach((levelData) =>
    levelData.forEach((node) => (id2searchNode[node.id] = node))
  );

  const searchLinksLevels = parsedDataCopy.map((levelData) =>
    levelData.links.filter((link) => link.type !== EHnswLinkType.None)
  );

  const entryNodesLevels = parsedData.map((levelData) =>
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
    searchTarget,
    entryNodesLevels,
    searchNodesLevels,
    searchLinksLevels,
    searchLayerPosLevels: layerPosLevels,
    searchTargetShowTime: targetShowTime,
    searchNodeShowTime: nodeShowTime,
    searchLinkShowTime: linkShowTime,
    searchTransitionDuration: duration,
    searchParams: searchRecords.searchParams,
  };
};
