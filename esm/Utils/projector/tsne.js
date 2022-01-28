import TSNE from 'tsne-js';

const fixedParams = {
  dim: 2,
};

export const TSNE_PROJECT_PARAMETERS = {
  dim: 'number of embedding dimensions, typically 2 or 3',
  perplexity:
    'approximately related to number of nearest neighbors used during learning, typically between 5 and 50',
  earlyExaggeration:
    'parameter which influences spacing between clusters, must be at least 1.0',
  learningRate:
    'learning rate for gradient descent, typically between 100 and 1000',
  nIter: 'maximum number of iterations, should be at least 200',
  metric:
    'distance measure to use for input data, currently implemented measures include euclidean, manhattan, jaccard (boolean data), dice (boolean data)',
  url: 'https://github.com/scienceai/tsne-js',
};

export const tsneProject = (projectParams = {}) => {
  const params = Object.assign({}, projectParams, fixedParams);
  return (vectors) => {
    // float32 => number
    const formatData = vectors.map(a => Array.from(a));
    const model = new TSNE(params);
    model.init({
      data: formatData,
      type: 'dense',
    });
    model.run();
    const res = model.getOutputScaled();
    return res;
  };
};
