import * as d3 from 'd3';
import clearCanvas from 'FederView/clearCanvas';
import InfoPanel from 'FederView/InfoPanel';
import TViewHandler from 'FederView/types';
import { TCoord, TId } from 'Types';
import {
  TViewParamsHnsw,
  TVisDataHnswGraph,
  TVisDataHnswGraphNode,
  TVisDataHnswOverview,
} from 'Types/visData';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import renderLayer from '../HnswSearchView/renderLayer';
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
  }
  renderView() {
    clearCanvas.call(this);

    for (let i = 0; i < this.overviewNodesLevels.length; i++) {
      const { nodes, level } = this.overviewNodesLevels[i];

      renderLayer.call(this, this.overviewLayerPosLevels[i]);
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
