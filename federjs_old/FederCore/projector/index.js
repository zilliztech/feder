import umapProject from './umap';

import { PROJECT_METHOD } from 'Types';

const projectorMap = {
  [PROJECT_METHOD.umap]: umapProject,
};

export const getProjector = ({ method, params = {} }) => {
  if (method in projectorMap) {
    return projectorMap[method](params);
  } else {
    console.error(`No projector for [${method}]`)
  }
};

export default getProjector;
