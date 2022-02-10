'use strict';
const faissFlatSearch = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./faissFlatSearch.js'));
const faissIVFSearch = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./faissIVFSearch.js'));

const faissIVFFlatSearch = ({ index, target, params = {} }) => {
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

  const fsAllIdsAndDistances = faissIVFSearch({ index, csListIds, target });
  const fsRes = fsAllIdsAndDistances.slice(0, Math.min(index.ntotal, k));

  const res = {
    coarse: csAllListIdsAndDistances,
    fine: fsAllIdsAndDistances,
    csResIds: csListIds,
    fsResIds: fsRes.map((d) => d.id),
  };

  return res;
};
exports.faissIVFFlatSearch = faissIVFFlatSearch;

module.exports = faissIVFFlatSearch;
