import { getDisFunc } from 'Utils/distFunc';

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
              // vec: cur.vectors[ofs]
            }))
          : []
      ),
    []
  );
  distances.sort((a, b) => a.dis - b.dis);
  return distances;
};

export default faissIVFSearch;
