import { TViewParamsIvfflat } from 'Types/visData';

export const defaltViewParamsIvfflat = {
  width: 800,
  height: 480,
  canvasScale: 1,

  nonNprobeClusterFill: '#175FFF',
  nonNprobeClusterOpacity: 1,
  nonNprobeClusterStroke: '#000',
  nonNprobeClusterStrokeWidth: 2,
  nprobeClusterFill: '#91FDFF',
  nprobeClusterOpacity: 1,
  nprobeClusterStroke: '#000',
  nprobeClusterStrokeWidth: 2,
  hoveredClusterFill: '#FFFC85',
  hoveredClusterOpacity: 0.8,
  hoveredClusterStroke: '#000',
  hoveredClusterStrokeWidth: 2,

  targetOuterR: 12,
  targetInnerR: 7,
  targetNodeStroke: '#fff',

  topkNodeR: 5,
  topkNodeOpacity: 0.7,
  nonTopkNodeR: 3,
  nonTopkNodeOpacity: 0.4,
  highlightNodeR: 6,
  highlightNodeStroke: '#fff',
  highlightNodeStrokeWidth: 1,
  highlightNodeOpacity: 1,

  polarAxisTickCount: 5,
  polarAxisStrokeWidth: 1,
  polarAxisStroke: '#175FFF',
  polarAxisOpacity: 0.4,

  transitionClustersExitTime: 800,
  transitionReplaceTime: 600,
  transitionNodesEnterTime: 800,
  transitionNodesMoveTime: 800,

  mediaContentCount: 9,
  staticPanelWidth: 240,
  hoveredPanelWidth: 250,
  clickedPanelWidth: 210,

  getVectorById: async () => []
} as TViewParamsIvfflat;

export default defaltViewParamsIvfflat;
