const getHnswlibHNSWOverviewData = ({ index, overviewLevel = 2 }) => {
  const { maxLevel, linkLists_levels } = index;
  const highlevel = Math.min(maxLevel - 1, overviewLevel);
  const lowlevel = maxLevel - highlevel;

  const highLevelNodes = linkLists_levels
    .map((linkLists_levels_item, internalId) =>
      linkLists_levels_item.length >= lowlevel
        ? {
            internalId,
            linksLevels: linkLists_levels_item.slice(
              lowlevel - 1,
              linkLists_levels_item.length
            ),
          }
        : null
    )
    .filter((d) => d);

  return highLevelNodes;
};

export default getHnswlibHNSWOverviewData;
