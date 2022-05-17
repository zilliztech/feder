export default function getOverviewShortestPathData({
  keyNode,
  keyLevel,
  overviewNodesLevels,
  internalId2overviewNode,
  overviewLevelCount,
}) {
  let SPLinksLevels = overviewNodesLevels.map((_) => []);
  let SPNodesLevels = overviewNodesLevels.map((_) => []);
  let reachableNodes = [];
  let reachableLinks = [];
  let reachableLevel = null;
  if (keyNode) {
    const path = [...keyNode.path, keyNode.internalId];
    if (path.length === 0) {
      SPNodesLevels = [keyNode.overviewPosLevels[keyLevel]];
    } else {
      let preNodeId = path[0];
      let preNode = internalId2overviewNode[preNodeId];
      let preLevel = overviewLevelCount - 1;
      SPNodesLevels[preLevel].push(preNode);
      for (let i = 1; i < path.length; i++) {
        let curNodeId = path[i];
        let curNode = internalId2overviewNode[curNodeId];
        while (curNode.overviewPosLevels.length <= preLevel) {
          preLevel -= 1;
          SPLinksLevels[preLevel].push({
            source: preNode,
            target: preNode,
          });
          SPNodesLevels[preLevel].push(preNode);
        }
        SPNodesLevels[preLevel].push(curNode);
        SPLinksLevels[preLevel].push({
          source: preNode,
          target: curNode,
        });
        preNode = curNode;
      }
      while (preLevel > keyLevel) {
        preLevel -= 1;
        SPLinksLevels[preLevel].push({
          source: preNode,
          target: preNode,
        });
        SPNodesLevels[preLevel].push(preNode);
      }
    }
    const preNodeInternalId =
      keyNode.path.length > 0 ? keyNode.path[keyNode.path.length - 1] : null;
    reachableLevel = keyLevel;
    reachableNodes = keyNode.linksLevels[keyLevel]
      .filter((internalId) => internalId != preNodeInternalId)
      .map((internalId) => internalId2overviewNode[internalId]);
    reachableLinks = reachableNodes.map((target) => ({
      source: keyNode,
      target,
    }));
  }
  return { SPLinksLevels, SPNodesLevels, reachableLevel, reachableNodes, reachableLinks };
}
