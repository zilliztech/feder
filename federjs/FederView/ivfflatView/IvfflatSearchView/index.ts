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
import transitionTargetMove from './transitionTargetMove';
import renderPolarAxis from './renderPolarAxis';
import transitionPolarAxisEnter from './transtionPolarAxisEnter';

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

  polarAxisTickCount: 5,
  polarAxisStrokeWidth: 1,
  polarAxisStroke: '#175FFF',
  polarAxisOpacity: 0.4,

  transitionClustersExitTime: 800,
  transitionReplaceTime: 600,
  transitionNodesEnterTime: 800,
  transitionNodesMoveTime: 800,
} as TViewParamsIvfflat;

export default class IvfflatSearchView implements ViewHandler {
  searchViewClusters: TVisDataIvfflatSearchViewCluster[];
  searchViewNodes: TVisDataIvfflatSearchViewNode[];
  targetNode: TVisDataIvfflatSearchViewTargetNode;
  polarOrigin: TCoord;
  polarR: number;
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
    const {
      searchViewClusters,
      searchViewNodes,
      targetNode,
      polarOrigin,
      polarR,
    } = visData;
    this.searchViewClusters = searchViewClusters;
    this.searchViewNodes = searchViewNodes;
    this.targetNode = targetNode;
    this.polarOrigin = polarOrigin;
    this.polarR = polarR;
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
    this.init();
  }
  init(): void {
    this.initColorScheme();
    this.initCanvas();
    this.initEventListener();
    // this.initPanel();
  }
  initColorScheme() {
    this.nprobe = this.searchViewClusters.filter(
      (cluster) => cluster.inNprobe
    ).length;
    this.colorScheme = d3
      .range(this.nprobe)
      .map((i) => d3.hsl((360 * i) / this.nprobe, 1, 0.5).formatHex());
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

  render() {
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
    this.stepType === EStepType.polar && renderPolarAxis.call(this);
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
      const timer = d3.timer((elapsed) => {
        if (elapsed > allTime) {
          timer.stop();
          this.stepType = newStepType;
          this.initVoronoiView();
        } else {
          clearCanvas.call(this);
          // nodes exit and clusters enter
          const reverse = true;
          transitionClustersExit.call(
            this,
            elapsed - transitionNodesEnterTime,
            reverse
          );
          this.stepType === EStepType.polar &&
            transitionPolarAxisEnter.call(this, elapsed, reverse);
          transitionNodesEnter.call(this, elapsed, this.stepType, reverse);
          transitionTargetMove.call(
            this,
            elapsed,
            transitionNodesEnterTime,
            this.stepType,
            EStepType.polar
          );
          transitionTargetMove.call(
            this,
            elapsed - transitionNodesEnterTime,
            transitionReplaceTime,
            EStepType.polar,
            EStepType.polar
          );
          transitionTargetMove.call(
            this,
            elapsed - transitionNodesEnterTime - transitionReplaceTime,
            transitionClustersExitTime,
            EStepType.polar,
            newStepType
          );
        }
      });
    } else if (this.stepType === EStepType.voronoi) {
      // voronoi => node
      const timer = d3.timer((elapsed) => {
        if (elapsed > allTime) {
          timer.stop();
          this.stepType = newStepType;
          this.initNodesView();
        } else {
          clearCanvas.call(this);
          transitionClustersExit.call(this, elapsed);
          newStepType === EStepType.polar &&
            transitionPolarAxisEnter.call(
              this,
              elapsed - transitionClustersExitTime - transitionReplaceTime
            );
          transitionNodesEnter.call(
            this,
            elapsed - transitionClustersExitTime,
            newStepType
          );
          transitionTargetMove.call(
            this,
            elapsed,
            transitionClustersExitTime,
            this.stepType,
            EStepType.polar
          );
          transitionTargetMove.call(
            this,
            elapsed - transitionClustersExitTime,
            transitionReplaceTime,
            EStepType.polar,
            EStepType.polar
          );
          transitionTargetMove.call(
            this,
            elapsed - transitionClustersExitTime - transitionReplaceTime,
            transitionNodesEnterTime,
            EStepType.polar,
            newStepType
          );
        }
      });
    } else {
      // node => node
      const timer = d3.timer((elapsed) => {
        if (elapsed > transitionNodesMoveTime) {
          timer.stop();
          this.stepType = newStepType;
          this.initNodesView();
        } else {
          clearCanvas.call(this);
          transitionPolarAxisEnter.call(
            this,
            elapsed,
            newStepType === EStepType.project
          );
          transitionNodesMove.call(this, elapsed);
          transitionTargetMove.call(
            this,
            elapsed,
            transitionClustersExitTime,
            this.stepType,
            newStepType
          );
        }
      });
    }
  }
}
