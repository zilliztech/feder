import { TId } from 'Types';
import { TIndexMetaHnswGraph } from 'Types/indexMeta';
import { TVisDataHnswGraph, TVisDataHnswGraphNode } from 'Types/visData';
import { getNodeIdWithLevel, parseNodeIdWidthLevel } from '../utils';

export default function addPathFromEntry(
  overviewGraphLayers: TIndexMetaHnswGraph[],
  entryPointId: TId
): TVisDataHnswGraph[] {
  const nodesLevels = overviewGraphLayers;
  const id2node = {} as { [id: TId]: TVisDataHnswGraphNode };
  nodesLevels.forEach(({ nodes, level }) => {
    nodes.forEach((node: TVisDataHnswGraphNode) => {
      const idWithLevel = getNodeIdWithLevel(node.id, level);
      node.idWithLevel = idWithLevel;
      node.pathFromEntry = [];
      id2node[idWithLevel] = node;
    });
  });

  const entryNodeIdWithLevel = getNodeIdWithLevel(
    entryPointId,
    nodesLevels[0].level
  );
  id2node[entryNodeIdWithLevel].pathFromEntry = [entryNodeIdWithLevel];
  let queue = [entryNodeIdWithLevel];

  let p = 0;
  while (p < queue.length) {
    const idWithLevel = queue[p];
    p += 1;
    const [level, nodeId] = parseNodeIdWidthLevel(idWithLevel);
    const currentNode = id2node[idWithLevel];
    const candidateIds = currentNode.links;
    candidateIds.forEach((candidateId) => {
      const candidateIdWithLevel = getNodeIdWithLevel(candidateId, level);
      if (queue.indexOf(candidateIdWithLevel) < 0) {
        id2node[candidateIdWithLevel].pathFromEntry = [
          ...currentNode.pathFromEntry,
          candidateIdWithLevel,
        ];
        queue.push(candidateIdWithLevel);
      }
    });
    const nextLevelNodeIdWithLevel = getNodeIdWithLevel(
      currentNode.id,
      level - 1
    );
    if (nextLevelNodeIdWithLevel in id2node) {
      if (queue.indexOf(nextLevelNodeIdWithLevel) < 0) {
        id2node[nextLevelNodeIdWithLevel].pathFromEntry = [
          ...currentNode.pathFromEntry,
          nextLevelNodeIdWithLevel,
        ];
        queue.push(nextLevelNodeIdWithLevel);
      }
    }
  }
  return nodesLevels;
}
