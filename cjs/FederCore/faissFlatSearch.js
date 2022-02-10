'use strict';
const { getDisFunc } = require('./distance.js');

const faissFlatSearch = ({ index, target}) => {
  const disFunc = getDisFunc(index.metricType);
  const distances = index.vectors.map((vec, id) => ({
    id,
    dis: disFunc(vec, target),
  }));
  distances.sort((a, b) => a.dis - b.dis);
  return distances;
};
exports.faissFlatSearch = faissFlatSearch;

module.exports = faissFlatSearch;
