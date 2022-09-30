import * as d3 from 'd3';
import InfoPanel from 'FederView/InfoPanel';
import initCanvas from 'FederView/initCanvas';
import initEventListener from 'FederView/initEventListener';
import TViewHandler from 'FederView/types';
import { TCoord, TId } from 'Types';
import {
  TViewParamsHnsw,
  TVisDataHnswGraph,
  TVisDataHnswGraphNode,
  TVisDataHnswOverview,
} from 'Types/visData';
import { getDisL2Square } from 'Utils/distFunc';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import initPanels from '../initPanels';
import updateClickedPanel from './updateClickedPanel';
import updateStaticPanel from './updateStaticPanel';
import renderView from './renderView';
export default class HnswOverview implements TViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  viewParams: TViewParamsHnsw;
  M: number;
  efConstruction: number;
  overviewNodesLevels: TVisDataHnswGraph[];
  overviewLayerPosLevels: TCoord[][];
  idWithLevel2node: { [idWithLevel: TId]: TVisDataHnswGraphNode };
  ctx: CanvasRenderingContext2D;
  mouseMoveHandler: Function;
  mouseClickHandler: Function;
  mouseLeaveHandler: Function;
  clickedLevel: number;
  clickedNode: TVisDataHnswGraphNode;
  hoveredNode: TVisDataHnswGraphNode;
  hoveredLevel: number;
  ntotal: number;
  nlevels: number;
  nodesCount: number[];
  linksCount: number[];
  constructor(visData: TVisDataHnswOverview, viewParams: TViewParamsHnsw) {
    this.viewParams = Object.assign({}, defaultViewParamsHnsw, viewParams);

    this.overviewNodesLevels = visData.overviewNodesLevels;
    this.overviewLayerPosLevels = visData.overviewLayerPosLevels;
    this.M = visData.M;
    this.efConstruction = visData.efConstruction;
    this.ntotal = visData.ntotal;
    this.nlevels = visData.nlevels;
    this.nodesCount = visData.nodesCount;
    this.linksCount = visData.linksCount;

    this.init();
  }
  init(): void {
    this.initIdWithLevel2node();
    initCanvas.call(this);
    initEventListener.call(this);
    initPanels.call(this);
  }
  initIdWithLevel2node() {
    const idWithLevel2node = {} as {
      [idWithLevel: TId]: TVisDataHnswGraphNode;
    };
    this.overviewNodesLevels.forEach(({ nodes }) =>
      nodes.forEach((node) => (idWithLevel2node[node.idWithLevel] = node))
    );
    this.idWithLevel2node = idWithLevel2node;
  }
  render(): void {
    this.initView();
  }

  initView() {
    // event;
    renderView.call(this);
    updateStaticPanel.call(this);

    const mouse2level = (x: number, y: number) =>
      this.overviewLayerPosLevels.findIndex((points) =>
        d3.polygonContains(points, [x, y])
      );
    const { mouseThresholdR, canvasScale } = this.viewParams;
    const threshold = Math.pow(mouseThresholdR * canvasScale, 2);
    const mouse2node = (x: number, y: number, level: number) => {
      const distances = this.overviewNodesLevels[level].nodes.map((node) =>
        getDisL2Square(node.overviewPos, [x, y])
      );
      const nearestNodeIndex = d3.minIndex(distances);
      return distances[nearestNodeIndex] < threshold
        ? this.overviewNodesLevels[level].nodes[nearestNodeIndex]
        : null;
    };
    this.mouseClickHandler = ({ x, y }: { x: number; y: number }) => {
      this.clickedLevel = mouse2level(x, y);
      if (this.clickedLevel >= 0) {
        const clickedNode = mouse2node(x, y, this.clickedLevel);
        if (clickedNode != this.clickedNode) {
          this.clickedNode = clickedNode;
          renderView.call(this);
          updateClickedPanel.call(this);
        }
      } else {
        this.clickedNode = null;
        renderView.call(this);
        updateClickedPanel.call(this);
      }
    };
    this.mouseMoveHandler = ({ x, y }: { x: number; y: number }) => {
      this.hoveredLevel = mouse2level(x, y);
      if (this.hoveredLevel >= 0) {
        const hoveredNode = mouse2node(x, y, this.hoveredLevel);
        if (hoveredNode != this.hoveredNode) {
          this.hoveredNode = hoveredNode;
          renderView.call(this);
        }
      } else {
        this.hoveredLevel = -1;
        this.hoveredNode = null;
        renderView.call(this);
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredLevel = -1;
      this.hoveredNode = null;
      renderView.call(this);
    };
  }
}
