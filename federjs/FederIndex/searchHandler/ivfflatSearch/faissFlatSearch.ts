import { TVec } from 'Types';
import { getDisFunc } from 'Utils/distFunc';

export const faissFlatSearch = ({ index, target }) => {
  const disFunc = getDisFunc(index.metricType);
  const distances = index.vectors.map((vec: TVec, clusterId: number) => ({
    clusterId,
    distance: disFunc(vec, target),
  }));
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
};

export default faissFlatSearch;
