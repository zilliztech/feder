import * as d3 from 'd3';
import clearCanvas from 'FederView/clearCanvas';
import initPanels from '../initPanels';
import InfoPanel from 'FederView/InfoPanel';
import ViewHandler from 'FederView/types';
import {
  TViewParamsIvfflat,
  TVisDataIvfflatOverview,
  TVisDataIvfflatOverviewCluster,
} from 'Types/visData';
import defaltViewParamsIvfflat from '../defaultViewParamsIvfflat';
import renderClusters from './renderClusters';
import updateHoveredPanel from './updateHoveredPanel';
import updateStaticPanel from './updateStaticPanel';

export default class IvfflatOverview implements ViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  overviewClusters: TVisDataIvfflatOverviewCluster[];
  viewParams: TViewParamsIvfflat;
  ctx: CanvasRenderingContext2D;
  mouseMoveHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseClickHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseLeaveHandler: () => void = null;
  hoveredCluster: TVisDataIvfflatOverviewCluster;
  ntotal: number;
  nlist: number;
  constructor(
    visData: TVisDataIvfflatOverview,
    viewParams: TViewParamsIvfflat
  ) {
    this.overviewClusters = visData.overviewClusters;
    this.ntotal = visData.ntotal;
    this.nlist = visData.nlist;
    if (!viewParams.mediaContent && !!viewParams.mediaCallback)
      viewParams.mediaContent = viewParams.mediaCallback;
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
    this.init();
  }
  init(): void {
    this.initCanvas();
    initPanels.call(this);
    this.initEventListener();
  }
  initCanvas() {
    const { width, height, canvasScale } = this.viewParams;
    const divD3 = d3
      .create('div')
      .style('position', 'relative')
      .style('width', `${width}px`)
      .style('height', `${height}px`);
    this.node = divD3.node();
    const canvasD3 = divD3
      .append('canvas')
      .attr('width', width)
      .attr('height', height);
    this.ctx = canvasD3.node().getContext('2d');
    this.ctx.scale(1 / canvasScale, 1 / canvasScale);
  }
  initEventListener() {
    const { canvasScale } = this.viewParams;
    this.ctx.canvas.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseMoveHandler && this.mouseMoveHandler({ x, y });
    });
    this.ctx.canvas.addEventListener('click', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseClickHandler && this.mouseClickHandler({ x, y });
    });
    this.ctx.canvas.addEventListener('mouseleave', () => {
      this.mouseLeaveHandler && this.mouseLeaveHandler();
    });
  }
  render(): void {
    this.initVoronoiView();
  }
  initVoronoiView() {
    this.renderVoronoiView();
    updateStaticPanel.call(this);

    this.mouseClickHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const hoveredCluster = this.overviewClusters.find((cluster) =>
        d3.polygonContains(cluster.OVPolyPoints, [x, y])
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
    updateHoveredPanel.call(this);
  }
}
