import { TIndexMetaIvfflat } from 'Types/indexMeta';
import { TIndexStructureIvfflat } from 'Types/indexStructure';

export const getIvfflatIndexMeta = (index: TIndexStructureIvfflat) => {
  const indexMeta = {
    nlist: index.nlist,
    ntotal: index.ntotal,
    clusters: index.invlists.data.map((d, clusterId) => ({
      clusterId,
      ids: d.ids,
      centroidVector: Array.from(index.childIndex.vectors[clusterId]),
    })),
  } as TIndexMetaIvfflat;

  return indexMeta;
};

export default getIvfflatIndexMeta;
