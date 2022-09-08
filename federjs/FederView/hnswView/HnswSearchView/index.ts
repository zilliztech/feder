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

import InfoPanel, { TInfoPanelContentItem } from 'FederView/InfoPanel';
import * as d3 from 'd3';
import TimeControllerView from './TimeControllerView';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import TimerController from './TimerController';
import transitionSearchView from './transitionSearchView';
import { EMediaType, TCoord, TId, TSearchParams } from 'Types';
import { getDisL2Square } from 'Utils/distFunc';
import initPanels from '../initPanels';

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
    // this.staticPanel = new InfoPanel();
    // this.clickedPanel = new InfoPanel();
    // this.hoveredPanel = new InfoPanel();

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
    this.initCanvas();
    this.initTimerController();
    this.initEventListener();
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
  async updateStaticPanel() {
    const { targetMedia } = this.actionData;
    let mediaContent = null;
    if (!!targetMedia) {
      mediaContent = {} as TInfoPanelContentItem;
      if (this.viewParams.mediaType === EMediaType.image)
        mediaContent.image = targetMedia;
      else if (this.viewParams.mediaType === EMediaType.text)
        mediaContent.text = targetMedia;
    }
    const ntotalContent = {
      text: `${this.ntotal} vectors, including ${this.searchNodesLevels.length} layers.`,
    };
    const metaContent = {
      text: `M = ${this.M}, ef_contruction = ${this.efConstruction}.`,
    };
    const searchParamsContent = {
      text: `k = ${this.searchParams.k}, ef_search = ${this.searchParams.ef}.`,
    };
    const numVisitedVector = Array.from(
      new Set(
        this.searchNodesLevels.reduce(
          (acc, nodes) => acc.concat(nodes.map((node) => node.id)),
          [] as TId[]
        )
      )
    ).length;
    const statisticsContent = {
      text: `${numVisitedVector} vectors were visited during search.`,
    };
    const searchDetailContent = this.searchNodesLevels
      .map((nodes, i) => {
        const part1 = {
          title: `Level ${i}`,
          text: `min-dist: ${d3
            .min(nodes, (node) => node.dist)
            .toFixed(3)}`,
        };
        const part2 = {
          text:
            `${nodes.length} / ${this.nodesCount[i]} vectors, ` +
            `${this.searchLinksLevels[i].length} / ${this.linksCount[i]} links.`,
        };
        return [part1, part2];
      })
      .reverse()
      .reduce((acc, cur) => acc.concat(cur), []);
    this.staticPanel.setContent({
      themeColor: '#FFFFFF',
      hasBorder: true,
      content: [
        { title: 'HNSW - Search' },
        mediaContent,
        metaContent,
        searchParamsContent,
        ntotalContent,
        statisticsContent,
        ...searchDetailContent,
      ].filter((a) => a),
    });
  }
  async updateClickedPanel() {}
  async updateHoveredPanel() {}
  initView() {
    this.timer.start();
    this.updateStaticPanel();

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
          if (!this.timer.isPlaying)
            transitionSearchView.call(this, this.timer.currentT);
        }
      } else {
        this.clickedNode = null;
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
        this.hoveredLevel = null;
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredLevel = -1;
      this.hoveredNode = null;
    };
    // transitionSearchView.call(this, this.timer.currentT);
  }
}
