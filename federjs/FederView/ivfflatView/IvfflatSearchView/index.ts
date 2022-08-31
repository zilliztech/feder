import ViewHandler from 'FederView/types';
import {
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
import { TCoord } from 'Types';
import { getDisL2Square } from 'Utils/distFunc';
import clearCanvas from '../clearCanvas';
import transitionClustersExit from './transitionClustersExit';
import transitionNodesEnter from './transitionNodesEnter';
import transitionNodesMove from './transitionNodesMove';

export enum EStepType {
  voronoi = 'voronoi',
  polar = 'polar',
  project = 'project',
}

const defaltViewParamsIvfflat = {
  width: 800,
  height: 480,
  canvasScale: 2,

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

  transitionClustersExitTime: 2000,
  transitionReplaceTime: 1000,
  transitionNodesEnterTime: 2000,
  transitionNodesMoveTime: 2000,
} as TViewParamsIvfflat;

export default class IvfflatSearchView implements ViewHandler {
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  searchViewNodes: TVisDataIvfflatSearchViewNode[];
  targetNode: TVisDataIvfflatSearchViewTargetNode;
  polarOrigin: TCoord;
  viewParams: TViewParamsIvfflat;
  node: HTMLElement;
  hoveredCluster: TVisDataIvfflatSearchViewCluster = null;
  hoveredNode: TVisDataIvfflatSearchViewNode = null;
  ctx: CanvasRenderingContext2D;
  stepType: EStepType = EStepType.voronoi;

  mouseMoveHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseClickHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseLeaveHandler: () => void = null;
  colorScheme: string[];
  nprobe: number;

  constructor(
    visData: TVisDataIvfflatSearchView,
    viewParams: TViewParamsIvfflat
  ) {
    const { searchViewClusters, searchViewNodes, targetNode, polarOrigin } =
      visData;
    this.searchViewClusters = searchViewClusters;
    this.searchViewNodes = searchViewNodes;
    this.targetNode = targetNode;
    this.polarOrigin = polarOrigin;
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);

    this.nprobe = this.searchViewClusters.filter(
      (cluster) => cluster.inNprobe
    ).length;
    this.colorScheme = d3
      .range(this.nprobe)
      .map((i) => d3.hsl((360 * i) / this.nprobe, 1, 0.5).formatHex());
    this.init();
  }
  init(): void {
    this.initCanvas();
    this.initEventListener();
    // this.initPanel();
  }
  initCanvas() {
    const divD3 = d3.create('div');
    this.node = divD3.node();
    const { width, height, canvasScale } = this.viewParams;
    const canvasD3 = divD3
      .append('canvas')
      .attr('width', width)
      .attr('height', height);
    this.ctx = canvasD3.node().getContext('2d');
    this.ctx.scale(1 / canvasScale, 1 / canvasScale);
  }
  initEventListener() {
    const { canvasScale } = this.viewParams;
    this.node.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseMoveHandler && this.mouseMoveHandler({ x, y });
    });
    this.node.addEventListener('click', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseClickHandler && this.mouseClickHandler({ x, y });
    });
    this.node.addEventListener('mouseleave', () => {
      this.mouseLeaveHandler && this.mouseLeaveHandler();
    });
  }
  render(): void {
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
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      this.renderVoronoiView();
    };
  }
  renderVoronoiView() {
    clearCanvas.call(this);
    renderClusters.call(this);
    renderTarget.call(this);
    // updatePanel
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
      }
    };

    this.mouseLeaveHandler = () => {
      this.hoveredNode = null;
      this.renderNodesView();
    };
  }
  renderNodesView() {
    clearCanvas.call(this);
    renderNodes.call(this);
    renderTarget.call(this);
    // updatePanel
  }

  switchView(newStepType: EStepType) {
    console.log(this.stepType, newStepType);
    if (newStepType === this.stepType) return;

    const {
      transitionClustersExitTime,
      transitionReplaceTime,
      transitionNodesEnterTime,
      transitionNodesMoveTime,
    } = this.viewParams;

    const allTime =
      transitionClustersExitTime +
      transitionReplaceTime +
      transitionNodesEnterTime;

    if (newStepType === EStepType.voronoi) {
      // node => voronoi
      // ExitTime node pos
      // ReplaceTime node / cluster opacity
      // EnterTime node pos
      const timer = d3.timer((elapsed) => {
        if (elapsed > allTime) {
          timer.stop();
          this.stepType = newStepType;
          this.initVoronoiView();
        } else {
          clearCanvas.call(this);
          transitionClustersExit.call(
            this,
            elapsed - transitionNodesEnterTime,
            true
          );
          transitionNodesEnter.call(this, elapsed, true);
        }
      });
    } else if (this.stepType === EStepType.voronoi) {
      // voronoi => node
      this.stepType = newStepType;
      const timer = d3.timer((elapsed) => {
        if (elapsed > allTime) {
          timer.stop();
          this.initNodesView();
        } else {
          clearCanvas.call(this);
          transitionClustersExit.call(this, elapsed);
          transitionNodesEnter.call(this, elapsed - transitionClustersExitTime);
        }
      });
    } else {
      // node => node
      this.stepType = newStepType;
      const timer = d3.timer((elapsed) => {
        if (elapsed > transitionNodesMoveTime) {
          timer.stop();
          this.initNodesView();
        } else {
          clearCanvas.call(this);
          transitionNodesMove.call(this, elapsed);
        }
      })
    }
  }
}
