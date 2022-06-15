import * as d3 from 'd3';
import { renderLoading, finishLoading } from './loading';
import { VIEW_TYPE } from 'Types';

export default class BaseView {
  constructor({ viewParams, getVectorById }) {
    this.viewParams = viewParams;

    const { width, height, canvasScale, mediaType, mediaCallback } = viewParams;
    this.clientWidth = width;
    this.width = width * canvasScale;
    this.clientHeight = height;
    this.height = height * canvasScale;
    this.getVectorById = getVectorById;
    this.canvasScale = canvasScale;
    this.mediaType = mediaType;
    this.mediaCallback = mediaCallback;

    this.actionPromise = null;
  }
  initCanvas(domNode) {
    renderLoading(domNode, this.viewParams.width, this.viewParams.height);
    const dom = d3.select(domNode);
    dom.selectAll('canvas').remove();
    const canvas = dom
      .append('canvas')
      .attr('width', this.clientWidth)
      .attr('height', this.clientHeight);
    const ctx = canvas.node().getContext('2d');
    ctx.scale(1 / this.canvasScale, 1 / this.canvasScale);
    this.ctx = ctx;
    this.canvas = canvas.node();

    return canvas.node();
  }
  // override
  overviewHandler() {}
  renderOverview() {}
  renderSearchView() {}
  setOverviewListenerHandlers() {}
  setSearchViewListenerHandlers() {}
  initInfoPanel() {}

  async overview(dom) {
    console.log('begin overview', dom.id);
    this.actionPromise && (await this.actionPromise);
    console.log('wait overview', dom.id);

    this.actionPromise = new Promise(async (resolve) => {
      // this.dom = dom;
      console.log('overview actionPromise', dom.id);
      const infoPanel = this.initInfoPanel(dom);
      this.viewType = VIEW_TYPE.overview;
      const canvas = this.initCanvas(dom);
      this.clickedNode = null;
      this.hoveredNode = null;
      this.overviewInitPromise && (await this.overviewInitPromise);
      finishLoading(dom);
      this.renderOverview(infoPanel);
      this.addMouseListener(canvas);
      this.setOverviewListenerHandlers(infoPanel);
      console.log('end overview');

      resolve();
    });
  }
  async search({ searchRes, targetMediaUrl, dom }) {
    console.log('begin search', dom.id);
    this.actionPromise && (await this.actionPromise);
    console.log('wait search', dom.id);

    this.actionPromise = new Promise(async (resolve) => {
      // this.dom = dom;
      console.log('search actionPromise', dom.id);
      const infoPanel = this.initInfoPanel(dom);
      this.viewType = VIEW_TYPE.search;
      this.targetMediaUrl = targetMediaUrl;
      const canvas = this.initCanvas(dom);
      this.clickedNode = null;
      this.hoveredNode = null;
      await this.searchViewHandler({ searchRes });
      finishLoading(dom);
      this.renderSearchView(infoPanel);
      this.addMouseListener(canvas);
      this.setSearchViewListenerHandlers(infoPanel);

      console.log('end search');
      resolve();
    });
  }

  addMouseListener(dom) {
    // const canvas = this.canvas;
    const canvasScale = this.canvasScale;
    dom.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseMoveHandler && this.mouseMoveHandler({ x, y });
    });
    dom.addEventListener('click', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseClickHandler && this.mouseClickHandler({ x, y });
    });
    dom.addEventListener('mouseleave', () => {
      this.mouse = null;
      this.mouseLeaveHandler && this.mouseLeaveHandler();
    });
  }
}
