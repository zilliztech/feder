import { TSearchParams } from 'Types/index.js';
import faissFlatSearch from './faissFlatSearch.js';
import faissIVFSearch from './faissIVFSearch.js';

export const faissIVFFlatSearch = ({
  index,
  target,
  params = {} as TSearchParams,
}) => {
  const { nprobe = 8, k = 10 } = params;

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
