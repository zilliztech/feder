import * as d3 from 'd3';
import {
  getNodeIdWithLevel,
  parseNodeIdWidthLevel,
} from 'FederLayout/visDataHandler/hnsw/utils';
import clearCanvas from 'FederView/clearCanvas';
import InfoPanel, { TInfoPanelContentItem } from 'FederView/InfoPanel';
import TViewHandler from 'FederView/types';
import { EMediaType, TCoord, TD3Link, TId } from 'Types';
import {
  TViewParamsHnsw,
  TVisDataHnswGraph,
  TVisDataHnswGraphNode,
  TVisDataHnswOverview,
} from 'Types/visData';
import { getDisL2Square, vecAdd, vecMultiply } from 'Utils/distFunc';
import defaultViewParamsHnsw from '../defaultViewParamsHnsw';
import renderLayer from '../HnswSearchView/renderLayer';
import initPanels from '../initPanels';
import renderTipLine from '../renderTipLine';
import renderLinks from './renderLinks';
import renderNodes from './renderNodes';
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
    this.initCanvas();
    this.initEventListener();
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
  async updateStaticPanel() {
    this.staticPanel.setContent({
      themeColor: '#FFFFFF',
      hasBorder: true,
      content: [
        {
          title: 'HNSW',
        },
        { text: `M = ${this.M}, ef_construction = ${this.efConstruction}` },
        {
          text: `${this.ntotal} vectors, ${this.nlevels}-layer hierarchical graph (only visual the top-${this.overviewNodesLevels.length} layers).`,
        },
        ...this.nodesCount
          .map((c, level) => {
            return {
              title: `Level ${level}`,
              text: `${c} vectors, ${this.linksCount[level]} links`,
            };
          })
          .reverse(),
      ],
    });
  }
  async updateClickedPanel() {
    const node = this.clickedNode;
    if (!node) {
      this.clickedPanel.setContent({ content: [] });
      return;
    }

    const mediaContent = {} as TInfoPanelContentItem;
    if (this.viewParams.mediaType === EMediaType.image)
      mediaContent.image = this.viewParams.mediaContent(node.id);
    else if (this.viewParams.mediaType === EMediaType.text)
      mediaContent.text = this.viewParams.mediaContent(node.id);

    const pathFromEntryTexts = this.overviewNodesLevels
      .filter((_, level) => {
        return level >= this.clickedLevel;
      })
      .map(
        ({ level }) =>
          `level ${level}: ` +
          node.pathFromEntry
            .filter(
              (idWithLevel) => parseNodeIdWidthLevel(idWithLevel)[0] === level
            )
            .map((idWithLevel) => parseNodeIdWidthLevel(idWithLevel)[1])
            .join(' => ')
      )
      .reverse();

    const linkedNodeText = node.links.join(', ');
    this.clickedPanel.setContent({
      themeColor: '#FFFC85',
      hasBorder: true,
      content: [
        { title: `Level ${node.level}` },
        { title: `Row No. ${node.id}` },
        mediaContent,
        { title: `Shortest path from the entry:` },
        ...pathFromEntryTexts.map((text) => ({ text })),
        { title: `Linked vectors:` },
        { text: linkedNodeText },
      ],
    });
  }
  async updateHoveredPanel(hoveredPanelPos: TCoord, reverse = false) {
    if (!hoveredPanelPos) {
      this.hoveredPanel.setContent({ content: [] });
      return;
    }
    if (reverse)
      this.hoveredPanel.setPosition({
        left: null,
        right: `${this.viewParams.width - hoveredPanelPos[0]}px`,
        top: `${hoveredPanelPos[1] - 4}px`,
      });
    else
      this.hoveredPanel.setPosition({
        left: `${hoveredPanelPos[0]}px`,
        top: `${hoveredPanelPos[1] - 4}px`,
      });

    const mediaContent = {} as TInfoPanelContentItem;
    if (this.viewParams.mediaType === EMediaType.image)
      mediaContent.image = this.viewParams.mediaContent(this.hoveredNode.id);
    else if (this.viewParams.mediaType === EMediaType.text)
      mediaContent.text = this.viewParams.mediaContent(this.hoveredNode.id);

    this.hoveredPanel.setContent({
      themeColor: '#FFFC85',
      hasBorder: false,
      flex: true,
      flexDirection: reverse ? 'row-reverse' : 'row',
      content: [{ title: `No. ${this.hoveredNode.id}` }, mediaContent],
    });
  }
  initView() {
    // event;
    this.renderView();
    this.updateStaticPanel();

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
          this.updateClickedPanel();
        }
      } else {
        this.clickedNode = null;
        this.renderView();
        this.updateClickedPanel();
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
    this.mouseLeaveHandler = () => {
      this.hoveredLevel = -1;
      this.hoveredNode = null;
      this.renderView();
    };
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

    if (!!this.hoveredNode) {
      const nodePos = this.hoveredNode.overviewPos;
      const origin = vecMultiply(
        vecAdd(
          this.overviewLayerPosLevels[0][0],
          this.overviewLayerPosLevels[0][2]
        ),
        0.5
      );
      const reverse = this.hoveredNode.overviewPos[0] < origin[0];
      const tooltipPos = renderTipLine.call(this, nodePos, reverse);
      this.updateHoveredPanel(
        vecMultiply(tooltipPos, 1 / this.viewParams.canvasScale) as TCoord,
        reverse
      );
    } else this.updateHoveredPanel(null);
  }
}
