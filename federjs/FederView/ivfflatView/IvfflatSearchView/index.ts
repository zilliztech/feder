import ViewHandler from 'FederView/types';
import {
  TAcitonData,
  TViewParamsIvfflat,
  TVisDataIvfflatSearchView,
  TVisDataIvfflatSearchViewCluster,
  TVisDataIvfflatSearchViewNode,
  TVisDataIvfflatSearchViewTargetNode,
} from 'Types/visData';
import renderClusters from './renderClusters';
import renderTarget from './renderTarget';
import renderNodes from './renderNodes';
import * as d3 from 'd3';
import { EStepType, TCoord } from 'Types';
import { getDisL2Square } from 'Utils/distFunc';
import clearCanvas from '../../clearCanvas';
import renderPolarAxis from './renderPolarAxis';
import defaltViewParamsIvfflat from '../defaultViewParamsIvfflat';
import InfoPanel from 'FederView/InfoPanel';
import initPanels from '../initPanels';
import updateHoveredPanelNodeView from './updateHoveredPanelNodeView';
import updateHoveredPanelVoronoiView from './updateHoveredPanelVoronoiView';
import updateStaticPanel from './updateStaticPanel';
import switchView from './switchView';
import initCanvas from 'FederView/initCanvas';
import initEventListener from 'FederView/initEventListener';

export default class IvfflatSearchView implements ViewHandler {
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  searchViewNodes: TVisDataIvfflatSearchViewNode[];
  targetNode: TVisDataIvfflatSearchViewTargetNode;
  polarOrigin: TCoord;
  polarR: number;
  viewParams: TViewParamsIvfflat;
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  hoveredCluster: TVisDataIvfflatSearchViewCluster = null;
  hoveredNode: TVisDataIvfflatSearchViewNode = null;
  ctx: CanvasRenderingContext2D;
  stepType: EStepType = EStepType.voronoi;

  mouseMoveHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseClickHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseLeaveHandler: () => void = null;
  colorScheme: string[];
  nprobe: number;
  actionData: TAcitonData;
  nlist: number;
  ntotal: number;

  constructor(
    visData: TVisDataIvfflatSearchView,
    viewParams: TViewParamsIvfflat,
    actionData: TAcitonData
  ) {
    const {
      searchViewClusters,
      searchViewNodes,
      targetNode,
      polarOrigin,
      polarR,
      nlist,
      ntotal,
    } = visData;
    this.actionData = actionData;
    this.searchViewClusters = searchViewClusters;
    this.searchViewNodes = searchViewNodes;
    this.targetNode = targetNode;
    this.polarOrigin = polarOrigin;
    this.polarR = polarR;
    this.nlist = nlist;
    this.ntotal = ntotal;
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
    this.init();
  }
  init(): void {
    this.initColorScheme();
    initCanvas.call(this);
    initPanels.call(this);
    initEventListener.call(this);
  }
  initColorScheme() {
    this.nprobe = this.searchViewClusters.filter(
      (cluster) => cluster.inNprobe
    ).length;
    this.colorScheme = d3
      .range(this.nprobe)
      .map((i) => d3.hsl((360 * i) / this.nprobe, 1, 0.5).formatHex());
  }

  render() {
    updateStaticPanel.call(this, EStepType.voronoi);
    this.initVoronoiView();
    // this.initPolarView();
    // this.initProjectView();
  }

  initVoronoiView() {
    this.stepType = EStepType.voronoi;
    this.renderVoronoiView();

    this.mouseClickHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const hoveredCluster = this.searchViewClusters.find((cluster) =>
        d3.polygonContains(cluster.SVPolyPoints, [x, y])
      );
      if (hoveredCluster !== this.hoveredCluster) {
        this.hoveredCluster = hoveredCluster;
        this.renderVoronoiView();
        updateHoveredPanelVoronoiView.call(this);
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      this.renderVoronoiView();
      updateHoveredPanelVoronoiView.call(this);
    };
  }

  renderVoronoiView() {
    clearCanvas.call(this);
    renderClusters.call(this);
    renderTarget.call(this);
  }

  initPolarView() {
    this.stepType = EStepType.polar;
    this.initNodesView();
  }
  initProjectView() {
    this.stepType = EStepType.project;
    this.initNodesView();
  }
  initNodesView() {
    this.renderNodesView();
    this.mouseClickHandler = null;

    const { highlightNodeR, canvasScale } = this.viewParams;
    const mouseInNodeR = highlightNodeR * canvasScale;
    const threshold = mouseInNodeR * mouseInNodeR;
    const getPos =
      this.stepType === EStepType.polar
        ? (node: TVisDataIvfflatSearchViewNode) => node.polarPos
        : (node: TVisDataIvfflatSearchViewNode) => node.projectPos;
    this.mouseMoveHandler = ({ x, y }) => {
      const distances = this.searchViewNodes.map((node) =>
        getDisL2Square(getPos(node), [x, y])
      );
      const nearestNodeIndex = d3.minIndex(distances);
      const hoveredNode =
        distances[nearestNodeIndex] < threshold
          ? this.searchViewNodes[nearestNodeIndex]
          : null;
      if (hoveredNode !== this.hoveredNode) {
        this.hoveredNode = hoveredNode;
        this.renderNodesView();
        updateHoveredPanelNodeView.call(this);
      }
    };

    this.mouseLeaveHandler = () => {
      this.hoveredNode = null;
      this.renderNodesView();
      updateHoveredPanelNodeView.call(this);
    };
  }
  renderNodesView() {
    clearCanvas.call(this);
    this.stepType === EStepType.polar && renderPolarAxis.call(this);
    renderNodes.call(this);
    renderTarget.call(this);
    // updatePanel
  }
  switchView(newStepType: EStepType) {
    switchView.call(this, newStepType);
  }
}
