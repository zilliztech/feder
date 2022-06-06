import * as d3 from 'd3';
import BaseView from '../BaseView.js';
import overviewLayoutHandler from './layout/overviewLayout';
import renderVoronoiView from './render/renderVoronoiView';
import renderNodeView from './render/renderNodeView';
import mouse2voronoi from './layout/mouse2voronoi';
import mouse2node from './layout/mouse2node';
import searchViewLayoutHandler from './layout/searchViewLayout';
import { SEARCH_VIEW_TYPE, VIEW_TYPE } from 'Types.js';
import animateCoarse2Fine from './render/animateCoarse2Fine';
import animateFine2Coarse from './render/animateFine2Coarse';
import animateFine2Fine from './render/animateFine2Fine';
import InfoPanel from './InfoPanel';

const defaultIvfflatViewParams = {
  minVoronoiRadius: 4,
  // voronoiForceTime: 3000,
  // nodeCollisionForceTime: 1000,
  backgroundColor: 'red',
  voronoiStrokeWidth: 2,
  targetNodeStrokeWidth: 5,
  targetNodeR: 7,
  topKNodeR: 5,
  hoveredNodeR: 6,
  hoveredNodeStrokeWidth: 1,
  hoveredNodeOpacity: 1,
  topKNodeOpacity: 0.7,
  topKNodeStrokeWidth: 1,
  nonTopKNodeR: 3,
  nonTopKNodeOpacity: 0.4,
  projectPadding: [20, 20, 20, 260],
  axisTickCount: 5,
  polarAxisStrokeWidth: 1,
  polarAxisOpacity: 0.4,
  polarOriginBias: 0.15,
  ease: d3.easeCubic,
  animateExitTime: 1500,
  animateEnterTime: 1000,
  fineSearchNodeTransTime: 1200,
  forceIterations: 100,
};

export default class IvfflatView extends BaseView {
  constructor({ indexMeta, domSelector, viewParams }) {
    super({
      indexMeta,
      domSelector,
      viewParams,
    });
    for (let key in defaultIvfflatViewParams) {
      this[key] =
        key in viewParams ? viewParams[key] : defaultIvfflatViewParams[key];
    }

    this.projectPadding = this.projectPadding.map(
      (num) => num * this.canvasScale
    );

    this.overviewHandler({ indexMeta });

    this.infoPanel = new InfoPanel({
      domSelector,
      width: viewParams.width,
      height: viewParams.height,
    });
  }

  overviewHandler({ indexMeta }) {
    Object.assign(this, indexMeta);
    this.overviewInitPromise = overviewLayoutHandler
      .call(this, { indexMeta })
      .then(({ clusters, voronoi }) => {
        this.clusters = clusters;
        this.OVVoronoi = voronoi;
      });
  }
  async renderOverview() {
    this.viewType === VIEW_TYPE.overview &&
      this.overviewInitPromise &&
      (await this.overviewInitPromise);
    this.viewType === VIEW_TYPE.search &&
      this.searchViewInitPromise &&
      (await this.searchViewInitPromise);
    this.viewType === VIEW_TYPE.overview &&
      this.infoPanel.updateOverviewOverviewInfo(this);
    this.viewType === VIEW_TYPE.search &&
      this.infoPanel.updateSearchViewCoarseOverviewInfo(this);
    renderVoronoiView.call(this);
  }
  async searchViewHandler({ searchRes }) {
    this.overviewInitPromise && (await this.overviewInitPromise);
    this.nprobe = searchRes.csResIds.length;
    this.k = searchRes.fsResIds.length;
    this.colorScheme = d3
      .range(this.nprobe)
      .map((i) => d3.hsl((360 * i) / this.nprobe, 1, 0.5).hex());
    this.searchViewInitPromise = searchViewLayoutHandler
      .call(this, {
        searchRes,
      })
      .then(() => {});
    await this.searchViewInitPromise;
    console.log('searchView Layout finished');
  }
  renderSearchView() {
    this.renderCoarseSearch();
  }
  renderCoarseSearch() {
    this.infoPanel.setOverviewPanelPos(!this.targetNode.isLeft_coarseLevel);
    this.infoPanel.updateSearchViewCoarseOverviewInfo(this);

    this.searchViewType = SEARCH_VIEW_TYPE.voronoi;
    renderVoronoiView.call(this);
  }
  async renderFineSearch(searchViewType = SEARCH_VIEW_TYPE.polar) {
    this.SVFinePromise && (await this.SVFinePromise);
    this.searchViewType = searchViewType;

    searchViewType === SEARCH_VIEW_TYPE.polar &&
      this.infoPanel.updateSearchViewFinePolarOverviewInfo(this);
    searchViewType === SEARCH_VIEW_TYPE.project &&
      this.infoPanel.updateSearchViewFineProjectOverviewInfo(this);

    renderNodeView.call(this);
  }

  async switchSearchView(searchViewType) {
    if (this.viewType !== VIEW_TYPE.search) {
      console.error('Only when searching can switch steps.');
      return;
    }

    if (searchViewType == this.searchViewType) return;

    this.SVFinePromise && (await this.SVFinePromise);

    const oldSearchViewType = this.searchViewType;
    const newSearchViewType = searchViewType;
    // coarse => fine
    if (oldSearchViewType === SEARCH_VIEW_TYPE.voronoi) {
      console.log('coarse => fine [start]');
      animateCoarse2Fine.call(this, { oldSearchViewType, newSearchViewType });
    }

    // fine => coarse
    if (newSearchViewType === SEARCH_VIEW_TYPE.voronoi) {
      console.log('fine => coarse [start]');
      animateFine2Coarse.call(this, { oldSearchViewType, newSearchViewType });
    }

    // fine - intra
    if (
      newSearchViewType !== SEARCH_VIEW_TYPE.voronoi &&
      oldSearchViewType !== SEARCH_VIEW_TYPE.voronoi
    ) {
      console.log('fine - intra [start]');
      animateFine2Fine.call(this, { oldSearchViewType, newSearchViewType });
    }
  }

  setOverviewListenerHandlers() {
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      // this.renderOverview();
      renderVoronoiView.call(this);
      this.infoPanel.updateOverviewHoveredInfo();
    };
    this.mouseMoveHandler = ({ x, y }) => {
      const hoveredClusterId = mouse2voronoi({
        voronoi: this.OVVoronoi,
        x,
        y,
      });
      if (hoveredClusterId !== this.hoveredClusterId) {
        this.hoveredClusterId = hoveredClusterId;
        this.hoveredCluster = this.clusters.find(
          (cluster) => cluster.clusterId == hoveredClusterId
        );
        // this.renderOverview();
        renderVoronoiView.call(this);

        if (!!this.hoveredCluster) {
          this.infoPanel.updateOverviewHoveredInfo({
            hoveredCluster: this.hoveredCluster,
            listIds: this.listIds[hoveredClusterId],
            images: this.listIds[hoveredClusterId].map((listId) =>
              this.mediaCallback(listId)
            ),
            x: this.hoveredCluster.OVPolyCentroid[0] / this.canvasScale,
            y: this.hoveredCluster.OVPolyCentroid[1] / this.canvasScale,
          });
        }
      }
    };
  }
  setSearchViewListenerHandlers() {
    this.mouseLeaveHandler = () => {
      this.hoveredCluster = null;
      this.searchViewType === SEARCH_VIEW_TYPE.voronoi &&
        renderVoronoiView.call(this);

      this.hoveredNode = null;
      this.searchViewType === SEARCH_VIEW_TYPE.voronoi &&
        this.infoPanel.updateSearchViewHoveredInfo();
      this.searchViewType !== SEARCH_VIEW_TYPE.voronoi &&
        this.infoPanel.updateSearchViewHoveredNodeInfo();
    };
    this.mouseMoveHandler = ({ x, y }) => {
      if (this.searchViewType === SEARCH_VIEW_TYPE.voronoi) {
        const hoveredClusterId = mouse2voronoi({
          voronoi: this.SVVoronoi,
          x,
          y,
        });
        if (hoveredClusterId !== this.hoveredClusterId) {
          this.hoveredClusterId = hoveredClusterId;
          this.hoveredCluster = this.clusters.find(
            (cluster) => cluster.clusterId == hoveredClusterId
          );
          // this.renderOverview();
          renderVoronoiView.call(this);

          if (!!this.hoveredCluster) {
            this.infoPanel.updateSearchViewHoveredInfo({
              hoveredCluster: this.hoveredCluster,
              listIds: this.listIds[hoveredClusterId],
              images: this.listIds[hoveredClusterId].map((listId) =>
                this.mediaCallback(listId)
              ),
              x: this.hoveredCluster.SVPolyCentroid[0] / this.canvasScale,
              y: this.hoveredCluster.SVPolyCentroid[1] / this.canvasScale,
            });
          }
        }
      } else {
        if (!this.nodes) return;
        const nodesPos =
          this.searchViewType === SEARCH_VIEW_TYPE.polar
            ? this.nodes.map((node) => node.polarPos)
            : this.nodes.map((node) => node.projectPos);
        const hoveredNodeIndex = mouse2node({
          nodesPos,
          x,
          y,
          bias: (this.hoveredNodeR + 2) * this.canvasScale,
        });
        const hoveredNode =
          hoveredNodeIndex >= 0 ? this.nodes[hoveredNodeIndex] : null;
        if (hoveredNode !== this.hoveredNode) {
          this.hoveredNode = hoveredNode;
          this.renderFineSearch(this.searchViewType);
        }

        const img = hoveredNode ? this.mediaCallback(hoveredNode.id) : '';
        this.infoPanel.updateSearchViewHoveredNodeInfo({
          hoveredNode,
          img,
          x: x / this.canvasScale,
          y: y / this.canvasScale,
        });
      }
    };
  }
}
