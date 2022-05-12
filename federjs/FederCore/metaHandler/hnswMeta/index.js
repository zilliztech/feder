import getHnswlibHNSWOverviewData from './hnswOverviewData';
export const getHnswMeta = (index, overviewLevelCount = 3) => {
  const { labels, vectors } = index;

  const id2vector = {};
  labels.forEach((id, i) => {
    id2vector[id] = vectors[i];
  });

  const overviewNodes = getHnswlibHNSWOverviewData({
    index,
    overviewLevelCount,
  });
  const indexMeta = {
    ntotal: index.ntotal,
    M: index.M,
    ef_construction: index.ef_construction,
    overviewLevelCount,
    levelCount: index.maxLevel + 1,
    overviewNodes,
  };

  return { id2vector, indexMeta };
};

export default getHnswMeta;
