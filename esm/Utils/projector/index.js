import { umapProject, UMAP_PROJECT_PARAMETERS } from './umap.js';
import { tsneProject, TSNE_PROJECT_PARAMETERS } from './tsne.js';

export const ProjectMethod = {
  TSNE: 'tsne',
  UMAP: 'umap',
  MDS: 'mds',
  PCA: 'pca',
};

class Projector {
  constructor(projectMethod = ProjectMethod.UMAP, projectParams = {}) {
    this.project = () => null;
    this.setProjectParams(projectMethod, projectParams);
  }
  setProjectParams(projectMethod, projectParams = {}) {
    if (projectMethod === ProjectMethod.UMAP) {
      this.project = umapProject(projectParams);
      this.PROJECT_PARAMETERS = UMAP_PROJECT_PARAMETERS;
    } else if (projectMethod === ProjectMethod.TSNE) {
      this.project = tsneProject(projectParams);
      this.PROJECT_PARAMETERS = TSNE_PROJECT_PARAMETERS;
    } else {
      console.log('Unknown project method', projectMethod);
    }
  }
}

export default Projector;
