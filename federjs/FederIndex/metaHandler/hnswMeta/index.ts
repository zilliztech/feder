import { TMetaParams } from 'Types';
import { TIndexMetaHnsw } from 'Types/indexMeta';
import { TIndexStructureHnsw } from 'Types/indexStructure';

export const getHnswIndexMeta = (
  index: TIndexStructureHnsw,
  metaParams: TMetaParams
) => {
  const { numOverviewLevel = 3 } = metaParams;
  const nOverviewLevels = Math.min(numOverviewLevel, index.maxLevel);
  const overviewGraphLayers = Array(nOverviewLevels)
    .fill(0)
    .map((_, i) => {
      const level = index.maxLevel - i;
      const nodes = index.linkLists_levels
        .map((linkLists, internalId) =>
          linkLists.length >= level
            ? {
                id: index.labels[internalId],
                links: linkLists[level - 1].map((iid) => index.labels[iid]),
              }
            : null
        )
        .filter((a) => a);
      return { level, nodes };
    });
  const nodesCount = Array(index.maxLevel)
    .fill(0)
    .map(
      (_, level) =>
        index.linkLists_levels.filter((linkLists) => linkLists.length > level)
          .length
    );
  nodesCount.unshift(index.linkLists_level_0.length);

  const linksCount = Array(index.maxLevel)
    .fill(0)
    .map((_, level) =>
      index.linkLists_levels
        .filter((linkLists) => linkLists.length > level)
        .reduce((acc, linkLists) => acc + linkLists[level].length, 0)
    );
  linksCount.unshift(
    index.linkLists_level_0.reduce(
      (acc, linkLists) => acc + linkLists.length,
      0
    )
  );

  const indexMeta = {
    efConstruction: index.ef_construction,
    M: index.M,
    ntotal: index.ntotal,
    nlevels: index.maxLevel + 1,
    nOverviewLevels,
    entryPointId: index.enterPoint,
    overviewGraphLayers,
    nodesCount,
    linksCount,
  } as TIndexMetaHnsw;

  return indexMeta;
};

export default getHnswIndexMeta;
