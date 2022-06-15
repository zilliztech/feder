import * as d3 from 'd3';
import BaseView from '../BaseView.js';
import overviewLayoutHandler from './layout/overviewLayout';
import mouse2node from './layout/mouse2node';
import renderOverview from './render/renderOverview';
import getOverviewShortestPathData from './layout/overviewShortestPath';
import searchViewLayoutHandler from './layout/searchViewLayout';
import TimeControllerView from './render/TimeControllerView';
import TimerController from './render/TimerController';
import renderSearchViewTransition from './render/renderSearchViewTransition';
import InfoPanel from './InfoPanel';

const defaultHnswViewParams = {
  padding: [80, 200, 60, 220],
  forceTime: 3000,
  layerDotNum: 20,
  shortenLineD: 8,
  overviewLinkLineWidth: 2,
  reachableLineWidth: 3,
  shortestPathLineWidth: 4,
  ellipseRation: 1.4,
  shadowBlur: 4,
  mouse2nodeBias: 3,
  highlightRadiusExt: 0.5,
  targetR: 3,
  searchViewNodeBasicR: 1.5,
  searchInterLevelTime: 300,
  searchIntraLevelTime: 100,
  HoveredPanelLine_1_x: 15,
  HoveredPanelLine_1_y: -25,
  HoveredPanelLine_2_x: 30,
  hoveredPanelLineWidth: 2,
  forceIterations: 100,
};
export default class HnswView extends BaseView {
  constructor({ indexMeta, viewParams, getVectorById }) {
    super({
      indexMeta,
      viewParams,
      getVectorById,
    });
    for (let key in defaultHnswViewParams) {
      this[key] =
        key in viewParams ? viewParams[key] : defaultHnswViewParams[key];
    }
    this.padding = this.padding.map((num) => num * this.canvasScale);
    
    this.overviewHandler(indexMeta);
  }
  initInfoPanel(dom) {
    const infoPanel = new InfoPanel({
      dom,
      width: this.viewParams.width,
      height: this.viewParams.height,
    });
    this.infoPanel = infoPanel;
    this.updateOverviewOverviewInfo = (info) =>
      infoPanel.updateOverviewOverviewInfo(info);
    this.updateOverviewHoveredInfo = (info) =>
      infoPanel.updateOverviewHoveredInfo({ ...this, ...info });
    this.updateOverviewClickedInfo = (info) =>
      infoPanel.updateOverviewClickedInfo({ ...this, ...info });
    this.updateSearchViewOverviewInfo = (info) =>
      infoPanel.updateSearchViewOverviewInfo({ ...this, ...info });
    this.updateSearchViewHoveredInfo = (info) =>
      infoPanel.updateSearchViewHoveredInfo({ ...this, ...info });
    this.updateSearchViewClickedInfo = (info) =>
      infoPanel.updateSearchViewClickedInfo({ ...this, ...info });

  }
  overviewHandler(indexMeta) {
    this.indexMeta = indexMeta;
    Object.assign(this, indexMeta);

    const internalId2overviewNode = {};
    this.overviewNodes.forEach(
      (node) => (internalId2overviewNode[node.internalId] = node)
    );
    this.internalId2overviewNode = internalId2overviewNode;

    this.overviewLayoutPromise = overviewLayoutHandler(this).then(
      ({
        overviewLayerPosLevels,
        overviewNodesLevels,
        overviewLinksLevels,
      }) => {
        this.overviewLayerPosLevels = overviewLayerPosLevels;
        this.overviewNodesLevels = overviewNodesLevels;
        this.overviewLinksLevels = overviewLinksLevels;
      }
    );
  }
  renderOverview() {
    const indexMeta = this.indexMeta;
    const nodesCount = this.overviewNodesLevels.map(
      (nodesLevel) => nodesLevel.length
    );
    const linksCount = this.overviewLinksLevels.map(
      (linksLevel) => linksLevel.length
    );
    const overviewInfo = { indexMeta, nodesCount, linksCount };
    this.updateOverviewOverviewInfo(overviewInfo);

    this.searchTransitionTimer && this.searchTransitionTimer.stop();
    renderOverview.call(this);
  }
  async searchViewHandler({ searchRes }) {
    await searchViewLayoutHandler.call(this, { searchRes });
    this.updateSearchViewOverviewInfo({});
  }
  renderSearchView() {
    const timeControllerView = new TimeControllerView(this.dom);

    const callback = ({ t, p }) => {
      renderSearchViewTransition.call(this, { t, p });
      timeControllerView.moveSilderBar(p);
    };
    const timer = new TimerController({
      duration: this.searchTransitionDuration,
      callback,
      playCallback: () => timeControllerView.play(),
      pauseCallback: () => timeControllerView.pause(),
    });
    timeControllerView.setTimer(timer);
    timer.start();
    this.searchTransitionTimer = timer;
  }
  setOverviewListenerHandlers() {
    this.mouseLeaveHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node({
        ...this,
        mouse,
        layerPosLevels: this.overviewLayerPosLevels,
        nodesLevels: this.overviewNodesLevels,
        posAttr: 'overviewPosLevels',
      });
      this.hoveredNodeChanged =
        this.hoveredLevel !== mouseLevel || this.hoveredNode !== mouseNode;
      this.hoveredNode = mouseNode;
      this.hoveredLevel = mouseLevel;

      if (this.hoveredNodeChanged && !this.clickedNode) {
        Object.assign(
          this,
          getOverviewShortestPathData({
            ...this,
            keyNode: mouseNode,
            keyLevel: mouseLevel,
          })
        );
        this.renderOverview();
        this.updateOverviewClickedInfo({
          x,
          y,
          node: mouseNode,
          level: mouseLevel,
        });
      }

      if (this.hoveredNodeChanged) {
        this.renderOverview();
        this.updateOverviewHoveredInfo({
          x,
          y,
          node: mouseNode,
          level: mouseLevel,
        });
      }
    };

    this.mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node({
        ...this,
        mouse,
        layerPosLevels: this.overviewLayerPosLevels,
        nodesLevels: this.overviewNodesLevels,
        posAttr: 'overviewPosLevels',
      });
      this.clickedNodeChanged =
        this.clickedLevel !== mouseLevel || this.clickedNode !== mouseNode;
      this.clickedNode = mouseNode;
      this.clickedLevel = mouseLevel;

      if (this.clickedNodeChanged) {
        Object.assign(
          this,
          getOverviewShortestPathData({
            ...this,
            keyNode: mouseNode,
            keyLevel: mouseLevel,
          })
        );

        this.updateOverviewClickedInfo({
          x,
          y,
          node: mouseNode,
          level: mouseLevel,
        });
        this.renderOverview();
      }
    };
  }
  setSearchViewListenerHandlers() {
    this.mouseLeaveHandler = null;
    this.mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node({
        ...this,
        mouse,
        layerPosLevels: this.searchLayerPosLevels,
        nodesLevels: this.searchNodesLevels,
        posAttr: 'searchViewPosLevels',
      });
      this.hoveredNodeChanged =
        this.hoveredLevel !== mouseLevel || this.hoveredNode !== mouseNode;
      this.hoveredNode = mouseNode;
      this.hoveredLevel = mouseLevel;

      if (this.hoveredNodeChanged) {
        this.updateSearchViewHoveredInfo({});
        if (!this.searchTransitionTimer.isPlaying) {
          renderSearchViewTransition.call(this, {
            t: this.searchTransitionTimer.tAlready,
          });
        }
      }
    };
    this.mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node({
        ...this,
        mouse,
        layerPosLevels: this.searchLayerPosLevels,
        nodesLevels: this.searchNodesLevels,
        posAttr: 'searchViewPosLevels',
      });
      this.clickedNodeChanged =
        this.clickedLevel !== mouseLevel || this.clickedNode !== mouseNode;
      this.clickedNode = mouseNode;
      this.clickedLevel = mouseLevel;

      if (this.clickedNodeChanged) {
        renderSearchViewTransition.call(this, {
          t: this.searchTransitionTimer.currentT,
        });
        this.updateSearchViewClickedInfo({});
      }
    };
  }
}
