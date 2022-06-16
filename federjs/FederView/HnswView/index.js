import * as d3 from 'd3';
import BaseView from '../BaseView.js';
import overviewLayoutHandler from './layout/overviewLayout';
import mouse2node from './layout/mouse2node';
import renderOverview from './render/renderOverview';
import getOverviewShortestPathData from './layout/overviewShortestPath';
import searchViewLayoutHandler from './layout/searchViewLayout';
import TimeControllerView from './render/TimeControllerView';
import TimerController from './render/TimerController';
import renderHoverLine from './render/renderHoverLine';
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
  targetOrigin: [0, 0],
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
    return infoPanel;
  }
  overviewHandler(indexMeta) {
    console.log(indexMeta);
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
  renderOverview(ctx, infoPanel) {
    const indexMeta = this.indexMeta;
    const nodesCount = this.overviewNodesLevels.map(
      (nodesLevel) => nodesLevel.length
    );
    const linksCount = this.overviewLinksLevels.map(
      (linksLevel) => linksLevel.length
    );
    const overviewInfo = { indexMeta, nodesCount, linksCount };
    infoPanel.updateOverviewOverviewInfo(overviewInfo);

    // this.searchTransitionTimer && this.searchTransitionTimer.stop();
    renderOverview(ctx, this);
  }
  getOverviewEventHandler(ctx, infoPanel) {
    let clickedNode = null;
    let clickedLevel = null;
    let hoveredNode = null;
    let hoveredLevel = null;
    let overviewHighlightData = null;
    const mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node(
        {
          mouse,
          layerPosLevels: this.overviewLayerPosLevels,
          nodesLevels: this.overviewNodesLevels,
          posAttr: 'overviewPosLevels',
        },
        this
      );
      const hoveredNodeChanged =
        hoveredLevel !== mouseLevel || hoveredNode !== mouseNode;
      hoveredNode = mouseNode;
      hoveredLevel = mouseLevel;

      if (hoveredNodeChanged) {
        if (!clickedNode) {
          overviewHighlightData = getOverviewShortestPathData(
            mouseNode,
            mouseLevel,
            this
          );
        }
        renderOverview(ctx, this, overviewHighlightData);
        const hoveredPanelPos = renderHoverLine(
          ctx,
          {
            hoveredNode,
            hoveredLevel,
            clickedNode,
            clickedLevel,
          },
          this
        );
        infoPanel.updateOverviewHoveredInfo(mouseNode, hoveredPanelPos, this);
      }
    };
    const mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node(
        {
          mouse,
          layerPosLevels: this.overviewLayerPosLevels,
          nodesLevels: this.overviewNodesLevels,
          posAttr: 'overviewPosLevels',
        },
        this
      );
      const clickedNodeChanged =
        clickedLevel !== mouseLevel || clickedNode !== mouseNode;
      clickedNode = mouseNode;
      clickedLevel = mouseLevel;

      if (clickedNodeChanged) {
        overviewHighlightData = getOverviewShortestPathData(
          mouseNode,
          mouseLevel,
          this
        );
        renderOverview(ctx, this, overviewHighlightData);
        infoPanel.updateOverviewClickedInfo(mouseNode, mouseLevel, this);
      }
    };
    return { mouseMoveHandler, mouseClickHandler };
  }

  searchViewHandler(searchRes) {
    return searchViewLayoutHandler(searchRes, this);
  }
  renderSearchView(ctx, infoPanel, searchViewLayoutData, targetMediaUrl, dom) {
    searchViewLayoutData.targetMediaUrl = targetMediaUrl;
    infoPanel.updateSearchViewOverviewInfo(searchViewLayoutData, this);
    const timeControllerView = new TimeControllerView(dom);

    const callback = ({ t, p }) => {
      renderSearchViewTransition(ctx, searchViewLayoutData, this, {
        t,
        p,
      });
      timeControllerView.moveSilderBar(p);
    };
    const timer = new TimerController({
      duration: searchViewLayoutData.searchTransitionDuration,
      callback,
      playCallback: () => timeControllerView.play(),
      pauseCallback: () => timeControllerView.pause(),
    });
    timeControllerView.setTimer(timer);
    timer.start();
    searchViewLayoutData.searchTransitionTimer = timer;
  }
  getSearchViewEventHandler(ctx, searchViewLayoutData, infoPanel) {
    searchViewLayoutData.clickedLevel = null;
    searchViewLayoutData.clickedNode = null;
    searchViewLayoutData.hoveredLevel = null;
    searchViewLayoutData.hoveredNode = null;

    const mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node(
        {
          mouse,
          layerPosLevels: searchViewLayoutData.searchLayerPosLevels,
          nodesLevels: searchViewLayoutData.searchNodesLevels,
          posAttr: 'searchViewPosLevels',
        },
        this
      );
      const hoveredNodeChanged =
        searchViewLayoutData.hoveredLevel !== mouseLevel ||
        searchViewLayoutData.hoveredNode !== mouseNode;
      searchViewLayoutData.hoveredNode = mouseNode;
      searchViewLayoutData.hoveredLevel = mouseLevel;

      if (hoveredNodeChanged) {
        infoPanel.updateSearchViewHoveredInfo(searchViewLayoutData, this);
        if (!searchViewLayoutData.searchTransitionTimer.isPlaying) {
          renderSearchViewTransition(ctx, searchViewLayoutData, this, {
            t: searchViewLayoutData.searchTransitionTimer.tAlready,
          });
        }
      }
    };

    const mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { mouseLevel, mouseNode } = mouse2node(
        {
          mouse,
          layerPosLevels: searchViewLayoutData.searchLayerPosLevels,
          nodesLevels: searchViewLayoutData.searchNodesLevels,
          posAttr: 'searchViewPosLevels',
        },
        this
      );
      const clickedNodeChanged =
        searchViewLayoutData.clickedLevel !== mouseLevel ||
        searchViewLayoutData.clickedNode !== mouseNode;
      searchViewLayoutData.clickedNode = mouseNode;
      searchViewLayoutData.clickedLevel = mouseLevel;

      if (clickedNodeChanged) {
        infoPanel.updateSearchViewClickedInfo(searchViewLayoutData, this);
        if (!searchViewLayoutData.searchTransitionTimer.isPlaying) {
          renderSearchViewTransition(ctx, searchViewLayoutData, this, {
            t: searchViewLayoutData.searchTransitionTimer.tAlready,
          });
        }
      }
    };

    return { mouseMoveHandler, mouseClickHandler };
  }
}
