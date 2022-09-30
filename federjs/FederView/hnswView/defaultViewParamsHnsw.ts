import { hexWithOpacity } from 'FederView/renderUtils2D';
import { TViewParamsHnsw } from 'Types/visData';

export const defaultViewParamsHnsw = {
  width: 800,
  height: 480,
  padding: [80, 200, 60, 220],
  canvasScale: 1,

  layerDotNum: 20,
  layerDotFill: '#ffffff',
  layerDotOpacity: 0.3,
  layerDotR: 0.8,
  layerBorderStroke: '#D9EAFF',
  layerBorderOpacity: 0.6,
  layerBorderStrokeWidth: 0.5,
  layerGradientStopColors: [
    [0.1, hexWithOpacity('#1E64FF', 0.4)],
    [0.9, hexWithOpacity('#00234D', 0)],
  ],

  searchInterLevelTime: 300,
  searchIntraLevelTime: 100,

  nodeEllipseRatio: 1.4,
  nodeShadowBlur: 5,
  coarseNodeFill: '#175FFF',
  coarseNodeOpacity: 0.7,
  candidateNodeFill: '#FFFC85',
  candidateNodeOpacity: 0.8,
  fineNodeFill: '#F36E4B',
  fineNodeOpacity: 1,
  targetNodeFill: '#FFFFFF',
  targetNodeOpacity: 1,

  linkShortenLineD: 6,
  normalLinkWidth: 2,
  normalGradientStopColors: [
    [0, hexWithOpacity('#061982', 0.3)],
    [1, hexWithOpacity('#1E64FF', 0.4)],
  ],
  importantLinkWidth: 3,
  importantGradientStopColors: [
    [0, hexWithOpacity('#ffffff', 0.2)],
    [1, hexWithOpacity('#FFFC85', 1)],
  ],
  targetLinkWidth: 3,
  targetGradientStopColors: [
    [0, hexWithOpacity('#FFFFFF', 0)],
    [1, hexWithOpacity('#FFFFFF', 0.8)],
  ],

  mouseThresholdR: 6,
  clickedNodeStroke: '#FFFC85',
  clickedNodeStrokeWidth: 1.5,

  overviewNodesR: [1.5, 2, 2.5, 3],

  tipLineOffset: [60, -20],
  tipLineAngle: Math.PI / 3,
  tipLineColor: '#FFFC85',
  tipLineWidth: 2,

  mediaContentCount: 9,

  staticPanelWidth: 240,
  hoveredPanelWidth: 250,
  clickedPanelWidth: 210,

  getVectorById: async () => [],
} as TViewParamsHnsw;
export default defaultViewParamsHnsw;
