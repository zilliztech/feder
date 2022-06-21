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
  constructor({ indexMeta, viewParams, getVectorById }) {
    super({
      viewParams,
      getVectorById,
    });
    for (let key in defaultIvfflatViewParams) {
      this[key] =
        key in viewParams ? viewParams[key] : defaultIvfflatViewParams[key];
    }

    this.projectPadding = this.projectPadding.map(
      (num) => num * this.canvasScale
    );
    this.indexMeta = indexMeta;
    this.overviewLayoutHandler();
  }
  initInfoPanel(dom) {
    const infoPanel = new InfoPanel({
      dom,
      width: this.clientWidth,
      height: this.clientHeight,
    });
    return infoPanel;
  }
  overviewLayoutHandler() {
    this.overviewLayoutPromise = overviewLayoutHandler(this).then(
      ({ clusters, voronoi }) => {
        // this.clusters = clusters;
        // this.OVVoronoi = voronoi;
        this.overviewLayoutData = { clusters, OVVoronoi: voronoi };
      }
    );
  }
  renderOverview(ctx, infoPanel) {
    infoPanel.updateOverviewOverviewInfo(this);
    renderVoronoiView(ctx, VIEW_TYPE.overview, this.overviewLayoutData, this);
  }
  getOverviewEventHandler(ctx, infoPanel) {
    let hoveredClusterId = null;

    const mouseLeaveHandler = () => {
      hoveredClusterId = null;
      renderVoronoiView(ctx, VIEW_TYPE.overview, this.overviewLayoutData, this);
      infoPanel.updateOverviewHoveredInfo();
    };

    const mouseMoveHandler = ({ x, y }) => {
      const currentHoveredClusterId = mouse2voronoi({
        voronoi: this.overviewLayoutData.OVVoronoi,
        x,
        y,
      });

      if (hoveredClusterId !== currentHoveredClusterId) {
        hoveredClusterId = currentHoveredClusterId;
        const hoveredCluster = this.overviewLayoutData.clusters.find(
          (cluster) => cluster.clusterId == hoveredClusterId
        );
        if (!!hoveredCluster) {
          renderVoronoiView(
            ctx,
            VIEW_TYPE.overview,
            this.overviewLayoutData,
            this,
            hoveredCluster
          );
          infoPanel.updateOverviewHoveredInfo({
            hoveredCluster,
            listIds: this.indexMeta.listIds[hoveredClusterId],
            images: this.mediaCallback
              ? this.indexMeta.listIds[hoveredClusterId].map((listId) =>
                  this.mediaCallback(listId)
                )
              : [],
            x: hoveredCluster.OVPolyCentroid[0] / this.canvasScale,
            y: hoveredCluster.OVPolyCentroid[1] / this.canvasScale,
          });
        }
      }
    };

    return { mouseLeaveHandler, mouseMoveHandler };
  }

  async searchViewHandler(searchRes) {
    this.overviewLayoutPromise && (await this.overviewLayoutPromise);

    const searchViewLayoutData = {
      nprobe: searchRes.csResIds.length,
      k: searchRes.fsResIds.length,
      clusters: JSON.parse(JSON.stringify(this.overviewLayoutData.clusters)),
    };
    searchViewLayoutData.nprobeClusters = searchViewLayoutData.clusters.filter(
      (cluster) => searchRes.csResIds.indexOf(cluster.clusterId) >= 0
    );
    searchViewLayoutData.nonNprobeClusters =
      searchViewLayoutData.clusters.filter(
        (cluster) => searchRes.csResIds.indexOf(cluster.clusterId) < 0
      );
    searchViewLayoutData.colorScheme = d3
      .range(searchViewLayoutData.nprobe)
      .map((i) =>
        d3.hsl((360 * i) / searchViewLayoutData.nprobe, 1, 0.5).formatHex()
      );
    await searchViewLayoutHandler(searchRes, searchViewLayoutData, this);
    return searchViewLayoutData;
  }
  renderSearchView(ctx, infoPanel, searchViewLayoutData, targetMediaUrl) {
    searchViewLayoutData.targetMediaUrl = targetMediaUrl;
    searchViewLayoutData.switchSearchViewHandlers = {
      switchVoronoi: () =>
        this.switchSearchView(
          SEARCH_VIEW_TYPE.voronoi,
          ctx,
          infoPanel,
          searchViewLayoutData
        ),
      switchPolar: () =>
        this.switchSearchView(
          SEARCH_VIEW_TYPE.polar,
          ctx,
          infoPanel,
          searchViewLayoutData
        ),
      switchProject: () =>
        this.switchSearchView(
          SEARCH_VIEW_TYPE.project,
          ctx,
          infoPanel,
          searchViewLayoutData
        ),
    };
    searchViewLayoutData.searchViewType = SEARCH_VIEW_TYPE.voronoi;
    this.renderCoarseSearch(ctx, infoPanel, searchViewLayoutData);
  }
  renderCoarseSearch(ctx, infoPanel, searchViewLayoutData) {
    infoPanel.setOverviewPanelPos(
      !searchViewLayoutData.targetNode.isLeft_coarseLevel
    );
    infoPanel.updateSearchViewCoarseOverviewInfo(searchViewLayoutData, this);
    renderVoronoiView(ctx, VIEW_TYPE.search, searchViewLayoutData, this);
  }
  renderFineSearch(
    ctx,
    infoPanel,
    searchViewLayoutData,
    searchViewType = SEARCH_VIEW_TYPE.polar
  ) {
    searchViewType === SEARCH_VIEW_TYPE.polar &&
      infoPanel.updateSearchViewFinePolarOverviewInfo(
        searchViewLayoutData,
        this
      );
    searchViewType === SEARCH_VIEW_TYPE.project &&
      infoPanel.updateSearchViewFineProjectOverviewInfo(
        searchViewLayoutData,
        this
      );

    renderNodeView(ctx, searchViewLayoutData, this, searchViewType);
  }
  switchSearchView(searchViewType, ctx, infoPanel, searchViewLayoutData) {
    if (searchViewType == searchViewLayoutData.searchViewType) return;

    const oldSearchViewType = searchViewLayoutData.searchViewType;
    const newSearchViewType = searchViewType;

    // coarse => fine

    if (oldSearchViewType === SEARCH_VIEW_TYPE.voronoi) {
      console.log('coarse => fine [start]');
      const endCallback = () => {
        searchViewLayoutData.searchViewType = newSearchViewType;
        this.renderFineSearch(
          ctx,
          infoPanel,
          searchViewLayoutData,
          newSearchViewType
        );
      };
      animateCoarse2Fine(
        oldSearchViewType,
        newSearchViewType,
        ctx,
        searchViewLayoutData,
        this,
        endCallback
      );
    }

    // fine => coarse
    if (newSearchViewType === SEARCH_VIEW_TYPE.voronoi) {
      console.log('fine => coarse [start]');
      const endCallback = () => {
        searchViewLayoutData.searchViewType = newSearchViewType;
        this.renderCoarseSearch(ctx, infoPanel, searchViewLayoutData);
      };
      animateFine2Coarse(
        oldSearchViewType,
        newSearchViewType,
        ctx,
        searchViewLayoutData,
        this,
        endCallback
      );
    }

    // fine - intra
    if (
      newSearchViewType !== SEARCH_VIEW_TYPE.voronoi &&
      oldSearchViewType !== SEARCH_VIEW_TYPE.voronoi
    ) {
      console.log('fine - intra [start]');
      const endCallback = () => {
        searchViewLayoutData.searchViewType = newSearchViewType;
        this.renderFineSearch(
          ctx,
          infoPanel,
          searchViewLayoutData,
          newSearchViewType
        );
      };
      animateFine2Fine(
        oldSearchViewType,
        newSearchViewType,
        ctx,
        searchViewLayoutData,
        this,
        endCallback
      );
    }
  }
  getSearchViewEventHandler(ctx, searchViewLayoutData, infoPanel) {
    let hoveredClusterId = null;
    let hoveredNode = null;
    const mouseLeaveHandler = () => {
      hoveredClusterId = null;
      hoveredNode = null;
      const { searchViewType } = searchViewLayoutData;
      if (searchViewType === SEARCH_VIEW_TYPE.voronoi) {
        renderVoronoiView(ctx, VIEW_TYPE.search, searchViewLayoutData, this);
        infoPanel.updateSearchViewHoveredInfo();
      } else {
        infoPanel.updateSearchViewHoveredNodeInfo();
      }
    };
    const mouseMoveHandler = ({ x, y }) => {
      const { searchViewType, clusters, nodes } = searchViewLayoutData;
      if (searchViewType === SEARCH_VIEW_TYPE.voronoi) {
        const currentHoveredClusterId = mouse2voronoi({
          voronoi: searchViewLayoutData.SVVoronoi,
          x,
          y,
        });
        if (hoveredClusterId !== currentHoveredClusterId) {
          hoveredClusterId = currentHoveredClusterId;
          const hoveredCluster = clusters.find(
            (cluster) => cluster.clusterId == hoveredClusterId
          );
          renderVoronoiView(
            ctx,
            VIEW_TYPE.search,
            searchViewLayoutData,
            this,
            hoveredCluster
          );

          if (!!hoveredCluster) {
            infoPanel.updateSearchViewHoveredInfo({
              hoveredCluster,
              listIds: this.indexMeta.listIds[hoveredClusterId],
              images: this.mediaCallback
                ? this.indexMeta.listIds[hoveredClusterId].map((listId) =>
                    this.mediaCallback(listId)
                  )
                : [],
              x: hoveredCluster.SVPolyCentroid[0] / this.canvasScale,
              y: hoveredCluster.SVPolyCentroid[1] / this.canvasScale,
            });
          }
        }
      } else {
        if (!nodes) return;
        const nodesPos =
          searchViewType === SEARCH_VIEW_TYPE.polar
            ? nodes.map((node) => node.polarPos)
            : nodes.map((node) => node.projectPos);
        const hoveredNodeIndex = mouse2node({
          nodesPos,
          x,
          y,
          bias: (this.hoveredNodeR + 2) * this.canvasScale,
        });
        const currentHoveredNode =
          hoveredNodeIndex >= 0 ? nodes[hoveredNodeIndex] : null;
        if (hoveredNode !== currentHoveredNode) {
          hoveredNode = currentHoveredNode;
          this.renderFineSearch(
            ctx,
            infoPanel,
            searchViewLayoutData,
            searchViewType,
            hoveredNode
          );
        }

        const img =
          hoveredNode && this.mediaCallback
            ? this.mediaCallback(hoveredNode.id)
            : '';
        infoPanel.updateSearchViewHoveredNodeInfo({
          hoveredNode,
          img,
          x: x / this.canvasScale,
          y: y / this.canvasScale,
        });
      }
    };
    return { mouseLeaveHandler, mouseMoveHandler };
  }
}
