import { EMetricType, TVec } from 'Types';

export const vecAdd = (vec1: TVec, vec2: TVec) =>
  vec1.map((d, i) => d + vec2[i]);

export const vecMultiply = (vec1: TVec, k: number) => vec1.map((d) => d * k);

export const getDisL2Square = (vec1: TVec, vec2: TVec) => {
  return vec1
    .map((num, i) => num - vec2[i])
    .map((num) => num * num)
    .reduce((a, c) => a + c, 0);
};

export const getDisL2 = (vec1: TVec, vec2: TVec) => {
  return Math.sqrt(
    vec1
      .map((num, i) => num - vec2[i])
      .map((num) => num * num)
      .reduce((a, c) => a + c, 0)
  );
};

export const getDisIR = (vec1: TVec, vec2: TVec) => {
  return vec1.map((num, i) => num * vec2[i]).reduce((acc, cur) => acc + cur, 0);
};

export const getDisFunc = (metricType: EMetricType) => {
  if (metricType === EMetricType.METRIC_L2) {
    return getDisL2;
  } else if (metricType === EMetricType.METRIC_INNER_PRODUCT) {
    return getDisIR;
  }
  console.warn('[getDisFunc] wrong metric_type, use L2 (default).', metricType);
  return getDisL2;
};
