import { umapProject, TUmapProjectParams } from './umap';
import seedrandom from 'seedrandom';
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
  if (!!params.projectSeed) params.random = seedrandom(params.projectSeed);
  return projectorMap[method](params);
};

export default getProjector;
