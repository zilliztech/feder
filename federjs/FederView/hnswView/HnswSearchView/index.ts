import {
  TId2ShowTime,
  TViewParamsHnsw,
  TVisDataHnswLink,
  TVisDataHnswNode,
  TVisDataHnswSearchView,
  TVisDataHnswTargetNode,
} from 'Types/visData';
import TViewHandler from 'FederView/types';

import InfoPanel from 'FederView/InfoPanel';
import * as d3 from 'd3';
import TimeControllerView from './TimeControllerView';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import TimerController from './TimerController';
import transitionSearchView from './transitionSearchView';
import { TCoord, TId, TSearchParams } from 'Types';

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
  searchTarget: TVisDataHnswTargetNode;
  entryNodesLevels: TVisDataHnswNode[][];
  searchNodesLevels: TVisDataHnswNode[][];
  searchLinksLevels: TVisDataHnswLink[][];
  searchLayerPosLevels: TCoord[][];
  searchTargetShowTime: number[];
  searchNodeShowTime: TId2ShowTime;
  searchLinkShowTime: TId2ShowTime;
  searchParams: TSearchParams;
  id2node: { [id: TId]: TVisDataHnswNode };
  constructor(visData: TVisDataHnswSearchView, viewParams: TViewParamsHnsw) {
    this.staticPanel = new InfoPanel();
    this.clickedPanel = new InfoPanel();
    this.hoveredPanel = new InfoPanel();

    this.viewParams = Object.assign({}, defaultViewParamsHnsw, viewParams);

    this.searchTransitionDuration = visData.searchTransitionDuration;
    this.searchTarget = visData.searchTarget;
    this.entryNodesLevels = visData.entryNodesLevels;
    this.searchNodesLevels = visData.searchNodesLevels;
    this.searchLinksLevels = visData.searchLinksLevels;
    this.searchLayerPosLevels = visData.searchLayerPosLevels;
    this.searchTargetShowTime = visData.searchTargetShowTime;
    this.searchNodeShowTime = visData.searchNodeShowTime;
    this.searchLinkShowTime = visData.searchLinkShowTime;
    this.searchParams = visData.searchParams;

    const id2node = {} as { [id: TId]: TVisDataHnswNode };
    this.searchNodesLevels.forEach((nodes) =>
      nodes.forEach((node) => (id2node[node.id] = node))
    );
    this.id2node = id2node;

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
      transitionSearchView.call(this, t);
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
    // transitionSearchView.call(this, this.timer.currentT);
  }
}
