import {
  TAcitonData,
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
import { getDisL2Square } from 'Utils/distFunc';
import initPanels from '../initPanels';
import updateStaticPanel from './updateStaticPanel';
import updateClickedPanel from './updateClickedPanel';
import initCanvas from 'FederView/initCanvas';
import initEventListener from 'FederView/initEventListener';

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
  clickedLevel: number;
  clickedNode: TVisDataHnswNode;
  hoveredLevel: number;
  hoveredNode: TVisDataHnswNode;
  actionData: TAcitonData;
  M: number;
  ntotal: number;
  efConstruction: number;
  nodesCount: number[];
  linksCount: number[];
  constructor(
    visData: TVisDataHnswSearchView,
    viewParams: TViewParamsHnsw,
    actionData: TAcitonData
  ) {
    this.viewParams = Object.assign({}, defaultViewParamsHnsw, viewParams);
    this.actionData = actionData;

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

    this.M = visData.M;
    this.ntotal = visData.ntotal;
    this.efConstruction = visData.efConstruction;
    this.nodesCount = visData.nodesCount;
    this.linksCount = visData.linksCount;

    const id2node = {} as { [id: TId]: TVisDataHnswNode };
    this.searchNodesLevels.forEach((nodes) =>
      nodes.forEach((node) => (id2node[node.id] = node))
    );
    this.id2node = id2node;

    this.init();
  }
  init() {
    initCanvas.call(this);
    this.initTimerController();
    initEventListener.call(this);
    initPanels.call(this);
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
  render() {
    this.initView();
  }

  initView() {
    this.timer.start();
    updateStaticPanel.call(this);

    const mouse2level = (x: number, y: number) =>
      this.searchLayerPosLevels.findIndex((points) =>
        d3.polygonContains(points, [x, y])
      );
    const { mouseThresholdR, canvasScale } = this.viewParams;
    const threshold = Math.pow(mouseThresholdR * canvasScale, 2);
    const mouse2node = (x: number, y: number, level: number) => {
      const distances = this.searchNodesLevels[level].map((node) =>
        getDisL2Square(node.searchViewPosLevels[level], [x, y])
      );
      const nearestNodeIndex = d3.minIndex(distances);
      return distances[nearestNodeIndex] < threshold
        ? this.searchNodesLevels[level][nearestNodeIndex]
        : null;
    };

    this.mouseClickHandler = ({ x, y }: { x: number; y: number }) => {
      this.clickedLevel = mouse2level(x, y);
      if (this.clickedLevel >= 0) {
        const clickedNode = mouse2node(x, y, this.clickedLevel);
        if (clickedNode !== this.clickedNode) {
          this.clickedNode = clickedNode;
          updateClickedPanel.call(this);
          if (!this.timer.isPlaying)
            transitionSearchView.call(this, this.timer.currentT);
        }
      } else {
        this.clickedNode = null;
        updateClickedPanel.call(this);
      }
    };
    this.mouseMoveHandler = ({ x, y }: { x: number; y: number }) => {
      this.hoveredLevel = mouse2level(x, y);
      if (this.hoveredLevel >= 0) {
        const hoveredNode = mouse2node(x, y, this.hoveredLevel);
        if (hoveredNode !== this.hoveredNode) {
          this.hoveredNode = hoveredNode;
          if (!this.timer.isPlaying)
            transitionSearchView.call(this, this.timer.currentT);
        }
      } else {
        this.hoveredLevel = -1;
        this.hoveredNode = null;
        if (!this.timer.isPlaying)
          transitionSearchView.call(this, this.timer.currentT);
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredLevel = -1;
      this.hoveredNode = null;
      if (!this.timer.isPlaying)
        transitionSearchView.call(this, this.timer.currentT);
    };
  }
}
