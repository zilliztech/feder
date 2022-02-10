'use strict';
const { umapProject, UMAP_PROJECT_PARAMETERS } = require('./umap.js');
const { tsneProject, TSNE_PROJECT_PARAMETERS } = require('./tsne.js');

const ProjectMethod = {
  TSNE: 'tsne',
  UMAP: 'umap',
  MDS: 'mds',
  PCA: 'pca',
};
exports.ProjectMethod = ProjectMethod;

const projectFuncMap = {
  [ProjectMethod.UMAP]: umapProject,
  [ProjectMethod.TSNE]: tsneProject,
};

const projectParamsDescMap = {
  [ProjectMethod.UMAP]: UMAP_PROJECT_PARAMETERS,
  [ProjectMethod.TSNE]: TSNE_PROJECT_PARAMETERS,
};

const getProjectFunc = (projectMethod, projectParams = {}) => {
  if (projectMethod in projectFuncMap) {
    return projectFuncMap[projectMethod](projectParams);
  }
  console.warn('Unknown project method, use default UMAP');
  return projectFuncMap[ProjectMethod.UMAP](projectParams);
};
exports.getProjectFunc = getProjectFunc;

const getProjectParamsGuide = (projectMethod) => {
  if (projectMethod in projectParamsDescMap) {
    return projectParamsDescMap[projectMethod];
  }
  console.warn('Unknown project method. current support tsne and umap');
  return {};
};
exports.getProjectParamsGuide = getProjectParamsGuide;

module.exports = getProjectFunc;
