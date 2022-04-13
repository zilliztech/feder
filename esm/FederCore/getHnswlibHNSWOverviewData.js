const getHnswlibHNSWOverviewData = ({ index, overviewLevel = 2 }) => {
  const { maxLevel, linkLists_levels, labels, enterPoint } = index;
  const highlevel = Math.min(maxLevel, overviewLevel);
  const lowlevel = maxLevel - highlevel;

  const highLevelNodes = linkLists_levels
    .map((linkLists_levels_item, internalId) =>
      linkLists_levels_item.length > lowlevel
        ? {
            internalId,
            id: labels[internalId],
            linksLevels: linkLists_levels_item.slice(
              lowlevel,
              linkLists_levels_item.length
            ),
            path: [],
          }
        : null
    )
    .filter((d) => d);
  // console.log('highLevelNodes', highLevelNodes)

  const internalId2node = {};
  highLevelNodes.forEach((node) => {
    internalId2node[node.internalId] = node;
  });

  let queue = [enterPoint];
  let start = 0;
  internalId2node[enterPoint].path = [];
  for (let level = highlevel - 1; level >= 0; level--) {
    while (start < queue.length) {
      const curNodeId = queue[start];
      const curNode = internalId2node[curNodeId];
      const candidateNodes = curNode.linksLevels[level];
      candidateNodes.forEach((candidateNodeId) => {
        const candidateNode = internalId2node[candidateNodeId];
        if (candidateNode.path.length === 0 && candidateNodeId !== enterPoint) {
          candidateNode.path = [...curNode.path, curNodeId];
          queue.push(candidateNodeId);
        }
      });
      start += 1;
    }
    queue = highLevelNodes
      .filter((node) => node.linksLevels.length > level)
      .map((node) => node.internalId);
    start = 0;
  }

  return highLevelNodes;
};

export default getHnswlibHNSWOverviewData;
