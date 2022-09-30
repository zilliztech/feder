import { EProjectMethod } from "Types";

export const defaultLayoutParamsIvfflat = {
  numForceIterations: 100,
  width: 800,
  height: 480,
  canvasScale: 1,
  coarseSearchWithProjection: true,
  fineSearchWithProjection: true,
  projectMethod: EProjectMethod.umap,
  projectParams: {},
  polarOriginBias: 0.15,
  polarRadiusUpperBound: 0.97,
  nonTopkNodeR: 3,
  minVoronoiRadius: 5,
  projectPadding: [20, 30, 20, 30],
  staticPanelWidth: 240,
};