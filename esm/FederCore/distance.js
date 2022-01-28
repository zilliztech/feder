import { MetricType } from './faissConfig.js';

export const getDisL2 = (vec1, vec2) => {
  return Math.sqrt(
    vec1
      .map((num, i) => num - vec2[i])
      .map((num) => num * num)
      .reduce((a, c) => a + c, 0)
  );
};

export const getDisIR = (vec1, vec2) => {
  return vec1.map((num, i) => num * vec2[i]).reduce((acc, cur) => acc + cur, 0);
};

export const getDisFunc = (metricType) => {
  if (metricType === MetricType.METRIC_L2) {
    return getDisL2;
  } else if (metricType === MetricType.METRIC_INNER_PRODUCT) {
    return getDisIR;
  }
  console.warn('[getDisFunc] wrong metric_type, use L2 (default).', metricType);
  return getDisL2;
};

export default getDisFunc;
