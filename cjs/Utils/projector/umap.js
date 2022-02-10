'use strict';
const { UMAP } = require('umap-js');

const fixedParams = {
  nComponents: 2,
};

const UMAP_PROJECT_PARAMETERS = {
  nComponents:
    'The number of components (dimensions) to project the data to. (default 2)',
  nEpochs:
    'The number of epochs to optimize embeddings via SGD. (computed automatically)',
  nNeighbors:
    'The number of nearest neighbors to construct the fuzzy manifold. (default 15)',
  minDist:
    'The effective minimum distance between embedded points, used with spread to control the clumped/dispersed nature of the embedding. (default 0.1)',
  spread:
    'The effective scale of embedded points, used with minDist to control the clumped/dispersed nature of the embedding. (default 1.0)',
  random:
    'A pseudo-random-number generator for controlling stochastic processes. (default Math.random())',
  distanceFn: 'A custom distance function to use. (default L2)',
  url: 'https://github.com/PAIR-code/umap-js',
};
exports.UMAP_PROJECT_PARAMETERS = UMAP_PROJECT_PARAMETERS;

const umapProject = (projectParams = {}) => {
  const params = Object.assign({}, projectParams, fixedParams);
  const umap = new UMAP(params);
  return (vectors) => umap.fit(vectors);
};
exports.umapProject = umapProject;
