import { getDisFunc } from 'Utils/distFunc';

export const faissIVFSearch = ({ index, csListIds, target }) => {
  const disFunc = getDisFunc(index.metricType);
  const distances = index.invlists.data.reduce(
    (acc, cur, listId) =>
      acc.concat(
        csListIds.includes(listId)
          ? cur.ids.map((id, ofs) => ({
              id,
              clusterId: listId,
              distance: disFunc(cur.vectors[ofs], target),
              vector: Array.from(cur.vectors[ofs]),
            }))
          : []
      ),
    []
  );
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
};

export default faissIVFSearch;
