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
import initCanvas from 'FederView/initCanvas';
import initEventListener from 'FederView/initEventListener';

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
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
    this.init();
  }
  init(): void {
    initCanvas.call(this);
    initPanels.call(this);
    initEventListener.call(this);
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
