import { TCoord, TId } from 'Types';
import { TIndexMetaHnsw } from 'Types/indexMeta';
import { TLayoutParamsHnsw, TVisDataHnswGraphNode } from 'Types/visData';
import addPathFromEntry from './addPathFromEntry';
import forceLevel from './forceLevel';
import scaleNodes from './scaleNodes';

export const overviewLayoutHandler = async (
  indexMeta: TIndexMetaHnsw,
  layoutParams: TLayoutParamsHnsw
): Promise<any> => {
  const { numForceIterations } = layoutParams;
  const { overviewGraphLayers, entryPointId, M } = indexMeta;
  return new Promise<any>((resolve) => {
    const overviewNodesLevels = addPathFromEntry(
      overviewGraphLayers,
      entryPointId
    );

    let id2pos = {} as { [id: TId]: TCoord };
    overviewNodesLevels.forEach(
      ({ nodes }: { nodes: TVisDataHnswGraphNode[] }) => {
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
        forceLevel({ nodes, links, numForceIterations });

        // scale
        scaleNodes({ nodes, M });

        // save
        id2pos = {};
        nodes.forEach((node) => {
          id2pos[node.id] = [node.x, node.y];
        });
      }
    );
    overviewNodesLevels.forEach(({ nodes }) =>
      nodes.forEach((node: TVisDataHnswGraphNode) => {
        node.forcePos = id2pos[node.id];
        delete node.x;
        delete node.y;
        delete node.fx;
        delete node.fy;
        delete node.vx;
        delete node.vy;
        delete node.index;
      })
    );

    resolve(overviewNodesLevels);
  });
};

export default overviewLayoutHandler;
