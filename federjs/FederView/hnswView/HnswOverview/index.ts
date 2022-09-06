import * as d3 from 'd3';
import {
  getNodeIdWithLevel,
  parseNodeIdWidthLevel,
} from 'FederLayout/visDataHandler/hnsw/utils';
import clearCanvas from 'FederView/clearCanvas';
import InfoPanel from 'FederView/InfoPanel';
import TViewHandler from 'FederView/types';
import { TCoord, TD3Link, TId } from 'Types';
import {
  TViewParamsHnsw,
  TVisDataHnswGraph,
  TVisDataHnswGraphNode,
  TVisDataHnswOverview,
} from 'Types/visData';
import { getDisL2Square } from 'Utils/distFunc';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import renderLayer from '../HnswSearchView/renderLayer';
import renderLinks from './renderLinks';
import renderNodes from './renderNodes';

export default class HnswOverview implements TViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  viewParams: TViewParamsHnsw;
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
  constructor(visData: TVisDataHnswOverview, viewParams: TViewParamsHnsw) {
    this.staticPanel = new InfoPanel();
    this.clickedPanel = new InfoPanel();
    this.hoveredPanel = new InfoPanel();

    this.viewParams = Object.assign({}, defaultViewParamsHnsw, viewParams);

    this.overviewNodesLevels = visData.overviewNodesLevels;
    this.overviewLayerPosLevels = visData.overviewLayerPosLevels;

    this.init();
  }
  init(): void {
    this.initIdWithLevel2node();
    this.initCanvas();
    this.initEventListener();
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
  render(): void {
    this.initView();
  }
  initView() {
    // event;
    this.renderView();

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
          this.renderView();
        }
      } else {
        this.clickedNode = null;
        this.renderView();
      }
    };
    this.mouseMoveHandler = ({ x, y }: { x: number; y: number }) => {
      this.hoveredLevel = mouse2level(x, y);
      if (this.hoveredLevel >= 0) {
        const hoveredNode = mouse2node(x, y, this.hoveredLevel);
        if (hoveredNode != this.hoveredNode) {
          this.hoveredNode = hoveredNode;
          this.renderView();
        }
      }
    };
    this.mouseLeaveHandler = () => {};
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
  renderView() {
    clearCanvas.call(this);

    const highlightNode = this.clickedNode || this.hoveredNode;

    for (let i = 0; i < this.overviewNodesLevels.length; i++) {
      const { nodes, level } = this.overviewNodesLevels[i];

      const baseLinks =
        i > 1
          ? nodes.reduce(
              (acc, node) =>
                acc.concat(
                  node.links.map((targetId) => ({
                    source: getNodeIdWithLevel(node.id, level),
                    target: getNodeIdWithLevel(targetId, level),
                  }))
                ),
              [] as TD3Link[]
            )
          : [];
      const pathFromEntryLinks =
        (highlightNode?.pathFromEntry
          .map((idWithLevel, k) => {
            const [_level, id] = parseNodeIdWidthLevel(idWithLevel);
            if (k > 0 && _level === level) {
              return {
                source: highlightNode.pathFromEntry[k - 1],
                target: idWithLevel,
              };
            }
            return null;
          })
          .filter((a) => a) as TD3Link[]) || [];
      const path2NeighborLinks =
        highlightNode && level === highlightNode.level
          ? highlightNode.links.map(
              (neighborId) =>
                ({
                  source: highlightNode.idWithLevel,
                  target: getNodeIdWithLevel(neighborId, highlightNode.level),
                } as TD3Link)
            )
          : [];

      renderLayer.call(this, this.overviewLayerPosLevels[i]);
      renderLinks.call(this, baseLinks, pathFromEntryLinks, path2NeighborLinks);
    }

    renderNodes.call(this);

    // for level
    // layer
    // links
    // pathFromEntry
    // path2neighbor
    // node
  }
}
