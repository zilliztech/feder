import * as d3 from 'd3';
import { renderLoading, finishLoading } from './loading';
import { VIEW_TYPE } from 'Types';

export default class BaseView {
  constructor({ dom, viewParams, getVectorById }) {
    this.dom = dom;
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
  }
  initCanvas() {
    renderLoading(this.dom, this.viewParams.width, this.viewParams.height);
    const dom = d3.select(this.dom);
    dom.selectAll('canvas').remove();
    const canvas = dom
      .append('canvas')
      .attr('width', this.clientWidth)
      .attr('height', this.clientHeight);
    const ctx = canvas.node().getContext('2d');
    ctx.scale(1 / this.canvasScale, 1 / this.canvasScale);
    this.ctx = ctx;
    this.canvas = canvas.node();
  }
  // override
  overviewHandler() {}
  renderOverview() {}
  renderSearchView() {}
  setOverviewListenerHandlers() {}
  setSearchViewListenerHandlers() {}

  async overview() {
    this.viewType = VIEW_TYPE.overview;
    this.initCanvas();
    this.clickedNode = null;
    this.hoveredNode = null;
    this.overviewInitPromise && (await this.overviewInitPromise);
    finishLoading(this.dom);
    this.renderOverview();
    this.addMouseListener();
    this.setOverviewListenerHandlers();
  }
  async search({ searchRes, targetMediaUrl }) {
    this.viewType = VIEW_TYPE.search;
    this.targetMediaUrl = targetMediaUrl;
    this.initCanvas();
    this.clickedNode = null;
    this.hoveredNode = null;
    await this.searchViewHandler({ searchRes });
    finishLoading(this.dom);
    this.renderSearchView();
    this.addMouseListener();
    this.setSearchViewListenerHandlers();
  }

  addMouseListener() {
    const canvas = this.canvas;
    const canvasScale = this.canvasScale;
    canvas.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseMoveHandler && this.mouseMoveHandler({ x, y });
    });
    canvas.addEventListener('click', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      this.mouseClickHandler && this.mouseClickHandler({ x, y });
    });
    canvas.addEventListener('mouseleave', () => {
      this.mouse = null;
      this.mouseLeaveHandler && this.mouseLeaveHandler();
    });
  }
}
