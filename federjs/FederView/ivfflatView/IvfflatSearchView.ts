import ViewHandler from 'FederView/types';
import {
  TVisDataIvfflatSearchView,
  TVisDataIvfflatSearchViewCluster,
  TVisDataIvfflatSearchViewNode,
  TVisDataIvfflatSearchViewTargetNode,
} from 'Types/visData';
import * as d3 from 'd3';
import {
  drawCircles,
  drawPolygons,
  hexWithOpacity,
} from 'FederView/renderUtils2D';
import { TCoord } from 'Types';

export enum EStepType {
  voronoi = 0,
  polar,
  project,
}

export interface TViewParamsIvfflat {
  width: number;
  height: number;
  canvasScale: number;

  nonNprobeClusterFill: string;
  nonNprobeClusterOpacity: number;
  nonNprobeClusterStroke: string;
  nonNprobeClusterStrokeWidth: number;
  nprobeClusterFill: string;
  nprobeClusterOpacity: number;
  nprobeClusterStroke: string;
  nprobeClusterStrokeWidth: number;
  hoveredClusterFill: string;
  hoveredClusterOpacity: number;
  hoveredClusterStroke: string;
  hoveredClusterStrokeWidth: number;

  targetOuterR: number;
  targetInnerR: number;
  targetNodeStroke: string;
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
    this.renderVoronoiView();
  }
  renderClusters() {
    // non-nprobe
    const {
      canvasScale,
      nonNprobeClusterFill,
      nonNprobeClusterOpacity,
      nonNprobeClusterStroke,
      nonNprobeClusterStrokeWidth,
      nprobeClusterFill,
      nprobeClusterOpacity,
      nprobeClusterStroke,
      nprobeClusterStrokeWidth,
      hoveredClusterFill,
      hoveredClusterOpacity,
      hoveredClusterStroke,
      hoveredClusterStrokeWidth,
    } = this.viewParams;
    const nonNprobeClusters = this.searchViewClusters.filter(
      (cluster) => !cluster.inNprobe
    );
    drawPolygons({
      ctx: this.ctx,
      pointsList: nonNprobeClusters.map((cluster) => cluster.SVPolyPoints),
      hasFill: true,
      fillStyle: hexWithOpacity(nonNprobeClusterFill, nonNprobeClusterOpacity),
      hasStroke: true,
      strokeStyle: nonNprobeClusterStroke,
      lineWidth: nonNprobeClusterStrokeWidth * canvasScale,
    });

    // probe
    const nprobeClusters = this.searchViewClusters.filter(
      (cluster) => cluster.inNprobe
    );
    drawPolygons({
      ctx: this.ctx,
      pointsList: nprobeClusters.map((cluster) => cluster.SVPolyPoints),
      hasFill: true,
      fillStyle: hexWithOpacity(nprobeClusterFill, nprobeClusterOpacity),
      hasStroke: true,
      strokeStyle: nprobeClusterStroke,
      lineWidth: nprobeClusterStrokeWidth * canvasScale,
    });

    // hover
    this.hoveredCluster &&
      drawPolygons({
        ctx: this.ctx,
        pointsList: [this.hoveredCluster.SVPolyPoints],
        hasFill: true,
        fillStyle: hexWithOpacity(hoveredClusterFill, hoveredClusterOpacity),
        hasStroke: true,
        strokeStyle: hoveredClusterStroke,
        lineWidth: hoveredClusterStrokeWidth * canvasScale,
      });
  }
  renderNodes() {
    // for t in nprobe
    // non-topk
    // top-k
    // hover
  }
  renderTarget() {
    const position =
      this.stepType === EStepType.voronoi
        ? this.targetNode.SVPos
        : this.targetNode.polarPos;
    const { canvasScale, targetOuterR, targetInnerR, targetNodeStroke } =
      this.viewParams;
    drawCircles({
      ctx: this.ctx,
      circles: [[...position, targetInnerR * canvasScale]],
      hasStroke: true,
      strokeStyle: targetNodeStroke,
      lineWidth: (targetOuterR - targetInnerR) * canvasScale,
    });
  }

  renderVoronoiView() {
    this.stepType = EStepType.voronoi;
    this.renderClusters();
    this.renderTarget();

    this.mouseClickHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const hoveredCluster = this.searchViewClusters.find((cluster) =>
        d3.polygonContains(cluster.SVPolyPoints, [x, y])
      );
      if (hoveredCluster !== this.hoveredCluster) {
        this.hoveredCluster = hoveredCluster;
        requestAnimationFrame(() => this.renderVoronoiView());
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      requestAnimationFrame(() => this.renderVoronoiView());
    };
    // updatePanel
  }
  renderPolarView() {
    this.stepType = EStepType.polar;
  }
  renderProjectView() {
    this.stepType = EStepType.project;
  }
}

export const renderVoronoiPolygon = ({}: {} = {}) => {};
