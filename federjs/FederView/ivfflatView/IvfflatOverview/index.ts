import * as d3 from 'd3';
import clearCanvas from 'FederView/clearCanvas';
import initPanels from 'FederView/hnswView/initPanels';
import InfoPanel, {
  TDivPosStyle,
  TInfoPanelContentItem,
} from 'FederView/InfoPanel';
import ViewHandler from 'FederView/types';
import { EMediaType } from 'Types';
import {
  TAcitonData,
  TViewParamsIvfflat,
  TVisDataIvfflatOverview,
  TVisDataIvfflatOverviewCluster,
} from 'Types/visData';
import { randomSelect } from 'Utils';
import { vecMultiply } from 'Utils/distFunc';
import defaltViewParamsIvfflat from '../defaultViewParamsIvfflat';
import renderClusters from './renderClusters';

export default class IvfflatOverview implements ViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  overviewClusters: TVisDataIvfflatOverviewCluster[];
  viewParams: TViewParamsIvfflat;
  ctx: CanvasRenderingContext2D;
  mouseMoveHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseClickHandler: ({ x, y }: { x: number; y: number }) => void = null;
  mouseLeaveHandler: () => void = null;
  hoveredCluster: TVisDataIvfflatOverviewCluster;
  ntotal: number;
  nlist: number;
  constructor(
    visData: TVisDataIvfflatOverview,
    viewParams: TViewParamsIvfflat
  ) {
    this.overviewClusters = visData.overviewClusters;
    this.ntotal = visData.ntotal;
    this.nlist = visData.nlist;
    this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
    this.init();
  }
  init(): void {
    this.initCanvas();
    initPanels.call(this);
    this.initEventListener();
  }
  initCanvas() {
    const { width, height, canvasScale } = this.viewParams;
    const divD3 = d3
      .create('div')
      .style('position', 'relative')
      .style('width', `${width}px`)
      .style('height', `${height}px`);
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
  render(): void {
    this.initVoronoiView();
  }
  initVoronoiView() {
    this.renderVoronoiView();
    this.updateStaticPanel();

    this.mouseClickHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const hoveredCluster = this.overviewClusters.find((cluster) =>
        d3.polygonContains(cluster.OVPolyPoints, [x, y])
      );
      if (hoveredCluster !== this.hoveredCluster) {
        this.hoveredCluster = hoveredCluster;
        this.renderVoronoiView();
      }
    };
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      this.renderVoronoiView();
    };
  }
  renderVoronoiView() {
    clearCanvas.call(this);
    renderClusters.call(this);
    this.updateHoveredPanel();
  }
  async updateStaticPanel() {
    const maxCount = d3.max(this.overviewClusters, (cluster) => cluster.count);
    const minCount = d3.min(this.overviewClusters, (cluster) => cluster.count);
    this.staticPanel.setContent({
      themeColor: '#FFFFFF',
      hasBorder: true,
      content: [
        { title: 'IVFFlat' },
        {
          text: `${this.ntotal} vectors, divided into ${this.nlist} clusters.`,
        },
        {
          text: `The largest cluster has ${maxCount} vectors and the smallest cluster has only ${minCount} vectors.`,
        },
      ],
    });
  }
  async updateHoveredPanel() {
    if (!this.hoveredCluster) {
      this.hoveredPanel.setContent({ content: [] });
      return;
    }

    if (this.viewParams.mediaType === EMediaType.image) {
      const mediaContent = {} as TInfoPanelContentItem;
      mediaContent.images = [];
      const representIds = randomSelect(this.hoveredCluster.ids, 9);
      for (let i = 0; i < representIds.length; i++) {
        const image = await this.viewParams.mediaContent(representIds[i]);
        mediaContent.images.push(image);
      }
      this.hoveredPanel.setContent({
        themeColor: '#FFFC85',
        hasBorder: true,
        content: [
          {
            text: `cluster-${this.hoveredCluster.clusterId}`,
          },
          {
            text: `including ${this.hoveredCluster.count} vectors`,
          },
          mediaContent,
        ],
      });
    } else if (this.viewParams.mediaType === EMediaType.text) {
      const representIds = randomSelect(this.hoveredCluster.ids, 6);
      const mediaContents = [] as TInfoPanelContentItem[];
      for (let i = 0; i < representIds.length; i++) {
        const text = await this.viewParams.mediaContent(representIds[i]);
        mediaContents.push({ text });
      }
      this.hoveredPanel.setContent({
        themeColor: '#FFFC85',
        hasBorder: true,
        content: [
          {
            text: `cluster-${this.hoveredCluster.clusterId}`,
          },
          {
            text: `including ${this.hoveredCluster.count} vectors`,
          },
          ...mediaContents,
        ],
      });
    }

    const { width, height, canvasScale } = this.viewParams;
    const pos = vecMultiply(
      this.hoveredCluster.OVPolyCentroid,
      1 / canvasScale
    );
    const posStyle = {} as TDivPosStyle;
    if (pos[0] > width * 0.6) {
      posStyle.left = null;
      posStyle.right = `${width - pos[0] + 10}px`;
    } else {
      posStyle.left = `${pos[0] + 10}px`;
      posStyle.right = null;
    }
    if (pos[1] > height * 0.55) {
      posStyle.top = null;
      posStyle.bottom = `${height - pos[1] + 6}px`;
    } else {
      posStyle.top = `${pos[1] + 6}px`;
      posStyle.bottom = null;
    }
    this.hoveredPanel.setPosition(posStyle);
  }
}
