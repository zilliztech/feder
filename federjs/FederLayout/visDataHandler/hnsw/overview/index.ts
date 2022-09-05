import { TCoord, TD3Node, TId } from 'Types';
import { TIndexMetaHnsw } from 'Types/indexMeta';
import {
  TLayoutParamsHnsw,
  TVisDataHnswGraph,
  TVisDataHnswGraphNode,
  TVisDataHnswOverview,
} from 'Types/visData';
import transformHandler from '../search/transformHandler';
import addPathFromEntry from './addPathFromEntry';
import forceLevel from './forceLevel';
import scaleNodes from './scaleNodes';

export const overviewLayoutHandler = (
  indexMeta: TIndexMetaHnsw,
  layoutParams: TLayoutParamsHnsw
) => {
  const { numForceIterations } = layoutParams;
  const { overviewGraphLayers, entryPointId, M, nOverviewLevels } = indexMeta;
  return new Promise<TVisDataHnswOverview>(async (resolve) => {
    const overviewNodesLevels = addPathFromEntry(
      overviewGraphLayers,
      entryPointId
    );

    let id2pos = {} as { [id: TId]: TCoord };
    for (let i = 0; i < overviewNodesLevels.length; i++) {
      const nodes = overviewNodesLevels[i].nodes as TVisDataHnswGraphNode[];
      nodes.forEach((node) => {
        if (node.id in id2pos) {
          const pos = id2pos[node.id];
          node.fx = pos[0];
          node.fy = pos[1];
        }
      });

      // force
      const links = nodes.reduce(
        (acc, cur) =>
          acc.concat(cur.links.map((target) => ({ source: cur.id, target }))),
        []
      );
      await forceLevel({ nodes, links, numForceIterations });

      // scale
      i < overviewNodesLevels.length - 1 && scaleNodes({ nodes, M });
      // save
      id2pos = {};
      nodes.forEach((node) => {
        id2pos[node.id] = [node.x, node.y];
      });
    }
    overviewNodesLevels.forEach(({ nodes }) =>
      nodes.forEach((node) => {
        node.forcePos = id2pos[node.id];
      })
    );

    const { layerPosLevels, transformFunc } = transformHandler(
      overviewNodesLevels[overviewNodesLevels.length - 1].nodes as TD3Node[],
      overviewNodesLevels.length,
      layoutParams
    );

    overviewNodesLevels.forEach(({ nodes }, i) =>
      nodes.forEach(
        (node) =>
          (node.overviewPos = transformFunc(
            ...node.forcePos,
            nOverviewLevels - 1 - i
          ))
      )
    );

    // removeD3DataAttribute(overviewNodesLevels);

    resolve({
      overviewNodesLevels: overviewNodesLevels.reverse(),
      overviewLayerPosLevels: layerPosLevels,
    });
  });
};

export default overviewLayoutHandler;

export const removeD3DataAttribute = (
  overviewNodesLevels: TVisDataHnswGraph[]
) => {
  overviewNodesLevels.forEach(({ nodes }) =>
    nodes.forEach((node: TVisDataHnswGraphNode) => {
      delete node.x;
      delete node.y;
      delete node.fx;
      delete node.fy;
      delete node.vx;
      delete node.vy;
      delete node.index;
    })
  );
};
