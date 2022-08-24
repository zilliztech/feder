import { umapProject, TUmapProjectParams } from './umap';

import { EProjectMethod, TCoord, TVec } from 'Types';

const projectorMap = {
  [EProjectMethod.umap]: umapProject,
};

export type TProjectParams = TUmapProjectParams;

export const getProjector = ({
  method,
  params = {},
}: {
  method: EProjectMethod;
  params: TProjectParams;
}): ((vecs: TVec[]) => TCoord[]) => {
  if (!(method in projectorMap)) {
    console.error(`No projector for [${method}]`);
  }
  return projectorMap[method](params);
};

export default getProjector;
