import { umapProject, UMAP_PROJECT_PARAMETERS } from './umap.js';
import { tsneProject, TSNE_PROJECT_PARAMETERS } from './tsne.js';

export const ProjectMethod = {
  TSNE: 'tsne',
  UMAP: 'umap',
  MDS: 'mds',
  PCA: 'pca',
};

const projectFuncMap = {
  [ProjectMethod.UMAP]: umapProject,
  [ProjectMethod.TSNE]: tsneProject,
};

const projectParamsDescMap = {
  [ProjectMethod.UMAP]: UMAP_PROJECT_PARAMETERS,
  [ProjectMethod.TSNE]: TSNE_PROJECT_PARAMETERS,
};

export const getProjectFunc = (projectMethod, projectParams = {}) => {
  if (projectMethod in projectFuncMap) {
    return projectFuncMap[projectMethod](projectParams);
  }
  console.warn('Unknown project method, use default UMAP');
  return projectFuncMap[ProjectMethod.UMAP](projectParams);
};

export const getProjectParamsGuide = (projectMethod) => {
  if (projectMethod in projectParamsDescMap) {
    return projectParamsDescMap[projectMethod];
  }
  console.warn('Unknown project method. current support tsne and umap');
  return {};
};

export default getProjectFunc;
