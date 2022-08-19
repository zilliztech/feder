import { getDisFunc } from 'Utils/distFunc';

export const faissFlatSearch = ({ index, target}) => {
  const disFunc = getDisFunc(index.metricType);
  const distances = index.vectors.map((vec, id) => ({
    id,
    dis: disFunc(vec, target),
  }));
  distances.sort((a, b) => a.dis - b.dis);
  return distances;
};

export default faissFlatSearch;
