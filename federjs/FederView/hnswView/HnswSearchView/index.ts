import { TViewParamsHnsw, TVisDataHnswSearchView } from 'Types/visData';
import TViewHandler from 'FederView/types';

import InfoPanel from 'FederView/InfoPanel';
import * as d3 from 'd3';
import TimeControllerView from './TimeControllerView';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import TimerController from './TimerController';

export default class HnswSearchView implements TViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  viewParams: TViewParamsHnsw;
  ctx: CanvasRenderingContext2D;
  timer: TimerController;
  searchTransitionDuration: number;
  mouseMoveHandler: Function;
  mouseClickHandler: Function;
  mouseLeaveHandler: Function;
  constructor(visData: TVisDataHnswSearchView, viewParams: TViewParamsHnsw) {
    this.staticPanel = new InfoPanel();
    this.clickedPanel = new InfoPanel();
    this.hoveredPanel = new InfoPanel();

    this.viewParams = Object.assign({}, defaultViewParamsHnsw, viewParams);

    this.searchTransitionDuration = visData.searchTransitionDuration;

    this.init();
  }
  init() {
    console.log('this', this);
    this.initCanvas();
    this.initTimerController();
    this.initEventListener();
  }
  initTimerController() {
    const timeControllerView = new TimeControllerView(this.node);

    const callback = ({ t, p }) => {
      // transitionSearchView.call(this);
      timeControllerView.moveSilderBar(p);
    };
    const timer = new TimerController({
      duration: this.searchTransitionDuration,
      callback,
      playCallback: () => timeControllerView.play(),
      pauseCallback: () => timeControllerView.pause(),
    });
    timeControllerView.setTimer(timer);
    this.timer = timer;
    // this.timer.start();
  }
  initCanvas() {
    const { width, height, canvasScale } = this.viewParams;
    const divD3 = d3
      .create('div')
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('position', 'relative');
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
    this.initView();
  }
  initView() {
    this.timer.start();
    this.mouseClickHandler = ({ x, y }: { x: number; y: number }) => {};
    this.mouseMoveHandler = ({ x, y }: { x: number; y: number }) => {};
    this.mouseLeaveHandler = () => {};
  }
}
