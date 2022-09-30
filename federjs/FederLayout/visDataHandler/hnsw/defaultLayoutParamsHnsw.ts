import { TLayoutParamsHnsw } from 'Types/visData';

export const defaultHnswLayoutParams = {
  width: 800,
  height: 480,
  canvasScale: 1,
  targetOrigin: [0, 0],
  numForceIterations: 100,
  padding: [80, 200, 60, 220],
  xBias: 0.65,
  yBias: 0.4,
  yOver: 0.1,
  targetR: 3,
  searchViewNodeBasicR: 1,
  searchViewNodeRStep: 0.5,
  searchInterLevelTime: 300,
  searchIntraLevelTime: 100,

  forceTime: 3000,
  layerDotNum: 20,
  shortenLineD: 8,
  overviewLinkLineWidth: 2,
  reachableLineWidth: 3,
  shortestPathLineWidth: 4,
  ellipseRation: 1.4,
  shadowBlur: 4,
  mouse2nodeBias: 3,
  highlightRadiusExt: 0.5,
  HoveredPanelLine_1_x: 15,
  HoveredPanelLine_1_y: -25,
  HoveredPanelLine_2_x: 30,
  hoveredPanelLineWidth: 2,
} as TLayoutParamsHnsw;

export default defaultHnswLayoutParams;
