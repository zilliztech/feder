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
  const indexMeta = {
    efConstruction: index.ef_construction,
    M: index.M,
    ntotal: index.ntotal,
    nlevels: index.maxLevel + 1,
    nOverviewLevels,
    entryPointId: index.enterPoint,
    overviewGraphLayers,
  } as TIndexMetaHnsw;

  return indexMeta;
};

export default getHnswIndexMeta;
