import { TSearchParams, TVec } from 'Types';
import { TIndexStructureIvfflat } from 'Types/indexStructure';
import faissFlatSearch from './faissFlatSearch.js';
import faissIVFSearch from './faissIVFSearch.js';

export const faissIVFFlatSearch = ({
  index,
  target,
  searchParams = {},
}: {
  index: TIndexStructureIvfflat;
  target: TVec;
  searchParams: TSearchParams;
}) => {
  const { nprobe = 8, k = 10 } = searchParams;

  // cs: coarse-search
  // fs: fine-search
  const csAllListIdsAndDistances = faissFlatSearch({
    index: index.childIndex,
    target,
  });
  const csRes = csAllListIdsAndDistances.slice(
    0,
    Math.min(index.nlist, nprobe)
  );
  const csListIds = csRes.map((res) => res.id);

  const fsAllIdsAndDistances = faissIVFSearch({
    index,
    csListIds,
    target,
  });
  // console.log('fsResProjections', fsResProjections);
  const fsRes = fsAllIdsAndDistances.slice(0, Math.min(index.ntotal, k));

  const coarse = csAllListIdsAndDistances;
  const fine = fsAllIdsAndDistances;
  const res = {
    coarse,
    fine,
    csResIds: csListIds,
    fsResIds: fsRes.map((d) => d.id),
  };

  return res;
};

export default faissIVFFlatSearch;
