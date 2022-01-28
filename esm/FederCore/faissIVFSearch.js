import { getDisFunc } from './distance.js';

export const faissIVFSearch = ({ index, csListIds, target }) => {
  const disFunc = getDisFunc(index.metricType);
  const distances = index.invlists.data.reduce(
    (acc, cur, listId) =>
      acc.concat(
        csListIds.includes(listId)
          ? cur.ids.map((id, ofs) => ({
              id,
              listId,
              dis: disFunc(cur.vectors[ofs], target),
            }))
          : []
      ),
    []
  );
  distances.sort((a, b) => a.dis - b.dis);
  return distances;
};

export default faissIVFSearch;
