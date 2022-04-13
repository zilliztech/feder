import * as d3 from 'd3';
import BaseView from './BaseView.js';
import { VIEW_TYPE } from '../Utils/config.js';
import { vecSort, inCircle, colorScheme } from '../Utils/index.js';
import { STEP, STEP_TYPE, ANiMATION_TYPE } from '../Utils/config.js';
import {
  backgroundColor,
  whiteColor,
  blackColor,
  ZBlue,
  ZYellow,
  voronoiHighlightColor,
  voronoiHoverColor,
  hexWithOpacity,
  voronoiStrokeWidth,
  drawVoronoi,
  drawVoronoiWithDots,
  drawRect,
  drawCircle,
} from './render.js';

const minRadius = 6;
const nonTopKNodeR = 4;
const topKNodeR = 8;
const hoverNodeR = 10;
const hoverNodeStrokeWidth = 2;
const nonTopKNodeOpacity = 0.3;
const topKNodeOpacity = 0.95;
const topKNodeStrokeWidth = 1;
const inCircleBias = 2;
const polarAxisStrokeWidth = 1;
const polarAxisOpacity = 0.4;

const targetNodeStrokeWidth = 6;
const targetNodeR = 12;

const stepExitTime = 1600;
const stepEnterTime = 1600;
const stepAllTime = stepExitTime + stepEnterTime;
const nodeTransTime = 1800;

export default class IVFFlatView extends BaseView {
  constructor({
    width,
    height,
    forceTime = 3000,
    projectPadding = [10, 5],
  } = {}) {
    super({ width, height });

    this.supportSwitchStep = true;
    this.overviewForceFinished = false;
    this.overviewForcePromise = null;
    this.searchComputeFinished = false;
    this.searchComputePromise = null;

    this.forceTime = forceTime;
    this.projectPadding = projectPadding;
    this.ease = d3.easeCubic;

    this.searchLayoutFinished = false;
    this.searchLayoutPromise = null;

    this.voronoiClickHandler = function () {
      console.log(arguments[0]);
    };
    this.nodeClickHandler = function () {
      console.log(arguments[0]);
    };
  }

  computeIndexOverview({ indexMeta }) {
    const width = this.width;
    const height = this.height;
    const allArea = width * height;
    const { ntotal, listCentroidProjections = null, listSizes } = indexMeta;
    const clusters = listSizes.map((listSize, i) => ({
      clusterId: i,
      oriProjection: listCentroidProjections
        ? listCentroidProjections[i]
        : [Math.random(), Math.random()],
      count: listSize,
      countP: listSize / ntotal,
      countArea: allArea * (listSize / ntotal),
    }));

    const x = d3
      .scaleLinear()
      .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[0]))
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(clusters, (cluster) => cluster.oriProjection[1]))
      .range([0, height]);

    clusters.forEach((cluster) => {
      cluster.x = x(cluster.oriProjection[0]);
      cluster.y = y(cluster.oriProjection[1]);
      cluster.r = Math.max(minRadius, Math.sqrt(cluster.countArea / Math.PI));
    });

    const simulation = d3
      .forceSimulation(clusters)
      .force(
        'collision',
        d3.forceCollide().radius((cluster) => cluster.r)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        // border
        clusters.forEach((cluster) => {
          cluster.x = Math.max(
            cluster.r,
            Math.min(width - cluster.r, cluster.x)
          );
          cluster.y = Math.max(
            cluster.r,
            Math.min(height - cluster.r, cluster.y)
          );
        });
      });

    this.overviewForceFinished = false;
    this.overviewForcePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        simulation.stop();
        clusters.forEach((cluster) => {
          cluster.forceProjection = [cluster.x, cluster.y];
        });
        this.computeOverViewVoronoi(
          clusters,
          'OVPolyCentroid',
          'OVPolyPoints',
          'OVVoronoi'
        );
        this.clusters = clusters;
        this.overviewForceFinished = true;
        resolve();
      }, this.forceTime);
    });
  }

  computeOverViewVoronoi(
    clusters,
    polyCentroid_Key,
    polyPoints_Key,
    voronoi_Key
  ) {
    const delaunay = d3.Delaunay.from(
      clusters.map((cluster) => [cluster.x, cluster.y])
    );
    const voronoi = delaunay.voronoi([0, 0, this.width, this.height]);
    this[voronoi_Key] = voronoi;
    clusters.forEach((cluster, i) => {
      const points = voronoi.cellPolygon(i);
      points.pop();
      cluster[polyPoints_Key] = points;
      cluster[polyCentroid_Key] = d3.polygonCentroid(points);
    });
  }

  async computeISCoarseVoronoi() {
    const width = this.width;
    const height = this.height;
    const searchClusters = this.clusters;
    const targetClusterId = this.searchRes.coarse[0].id;
    const otherFineClustersId = this.searchRes.csResIds.filter(
      (clusterId) => clusterId !== targetClusterId
    );
    // console.log('fineNode', fineNode);
    // console.log('otherFineClustersId', otherFineClustersId);
    const links = otherFineClustersId.map((clusterId) => ({
      source: clusterId,
      target: targetClusterId,
    }));
    searchClusters.forEach((cluster) => {
      cluster.x = cluster.forceProjection[0];
      cluster.y = cluster.forceProjection[1];
    });
    const simulation = d3
      .forceSimulation(searchClusters)
      .force(
        'links',
        d3.forceLink(links).id((cluster) => cluster.clusterId)
      )
      .force(
        'collision',
        d3.forceCollide().radius((cluster) => cluster.r)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        // border
        searchClusters.forEach((cluster) => {
          cluster.x = Math.max(
            cluster.r,
            Math.min(width - cluster.r, cluster.x)
          );
          cluster.y = Math.max(
            cluster.r,
            Math.min(height - cluster.r, cluster.y)
          );
        });
      });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        simulation.stop();
        searchClusters.forEach((cluster) => {
          cluster.SVPos = [cluster.x, cluster.y];
        });
        this.computeOverViewVoronoi(
          searchClusters,
          'SVPolyCentroid',
          'SVPolyPoints',
          'SVVronoi'
        );
        this.clusters = searchClusters;

        const targetCluster = searchClusters.find(
          (cluster) => cluster.clusterId === targetClusterId
        );
        const centoid_fineClusters_x =
          this.nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[0],
            0
          ) / this.nprobeClusters.length;
        const centroid_fineClusters_y =
          this.nprobeClusters.reduce(
            (acc, cluster) => acc + cluster.SVPolyCentroid[1],
            0
          ) / this.nprobeClusters.length;
        const _x = centoid_fineClusters_x - targetCluster.SVPos[0];
        const _y = centroid_fineClusters_y - targetCluster.SVPos[1];
        const biasR = Math.sqrt(_x * _x + _y * _y);
        const targetNode = {
          SVPos: [
            targetCluster.SVPos[0] + targetCluster.r * 0.5 * (_x / biasR),
            targetCluster.SVPos[1] + targetCluster.r * 0.5 * (_y / biasR),
          ],
        };
        // let randAngle = Math.random() * Math.PI * 2;
        // let randBias = [Math.sin, Math.cos].map(
        //   (f) => targetCluster.r * 0.6 * f(randAngle)
        // );
        // const targetNode = {
        //   SVPos: targetCluster.SVPos.map(
        //     (d, i) => d + randBias[i]
        //   ),
        // };
        targetNode.isLeft_coarseLevel = targetNode.SVPos[0] < this.width / 2;
        this.targetNode = targetNode;
        // console.log('targetNode', targetNode);

        // const polarOrigin = [
        //   width * (targetNode.isLeft_coarseLevel ? 0.35 : 0.65),
        //   height / 2,
        // ];
        const polarOrigin = [width / 2, height / 2];
        this.polarOrigin = polarOrigin;
        targetNode.polarPos = polarOrigin;
        const polarMaxR = Math.min(width, height) * 0.5 - 5;
        this.polarMaxR = polarMaxR;

        const fineClusterOrder = vecSort(
          this.nprobeClusters,
          'SVPolyCentroid',
          'clusterId'
        );
        // console.log('fineClusterOrder', fineClusterOrder, this.nprobeClusters)
        const angleStep = (Math.PI * 2) / fineClusterOrder.length;
        this.nprobeClusters.forEach((cluster) => {
          const order = fineClusterOrder.indexOf(cluster.clusterId);
          cluster.polarOrder = order;
          cluster.SVNextLevelPos = [
            polarOrigin[0] + (polarMaxR / 2) * Math.sin(angleStep * order),
            polarOrigin[1] + (polarMaxR / 2) * Math.cos(angleStep * order),
          ];
          cluster.SVNextLevelTran = [
            cluster.SVNextLevelPos[0] - cluster.SVPolyCentroid[0],
            cluster.SVNextLevelPos[1] - cluster.SVPolyCentroid[1],
          ];
        });
        const clusterId2cluster = {};
        this.nprobeClusters.forEach((cluster) => {
          clusterId2cluster[cluster.clusterId] = cluster;
        });
        this.clusterId2cluster = clusterId2cluster;

        resolve();
      }, this.forceTime);
    });
  }

  async computeISFinePolar() {
    const nodes = this.searchRes.fine;
    // const { isLeft_coarseLevel } = this.targetNode;
    // console.log('isLeft_coarseLevel', isLeft_coarseLevel);

    const polarMaxR = this.polarMaxR;
    const polarOrigin = this.polarOrigin;
    const r = d3
      .scaleLinear()
      .domain([
        d3.min(
          nodes.filter((node) => node.dis > 0),
          (node) => node.dis
        ),
        d3.max(nodes, (node) => node.dis) * 0.95,
      ])
      .range([polarMaxR * 0.2, polarMaxR])
      .clamp(true);

    nodes.forEach((node) => {
      const cluster = this.clusterId2cluster[node.listId];
      const { polarOrder, SVNextLevelPos } = cluster;
      node.polarOrder = polarOrder;
      let randAngle = Math.random() * Math.PI * 2;
      let randBias = [Math.sin, Math.cos].map(
        (f) => cluster.r * Math.random() * 0.7 * f(randAngle)
      );
      node.voronoiPos = SVNextLevelPos.map((d, i) => d + randBias[i]);
      node.x = node.voronoiPos[0];
      node.y = node.voronoiPos[1];
      node.r = r(node.dis);
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((_) => nonTopKNodeR)
          .strength(0.4)
      )
      .force('r', d3.forceRadial((node) => node.r, ...polarOrigin).strength(1));
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        simulation.stop();
        nodes.forEach((node) => {
          node.polarPos = [node.x, node.y];
        });

        resolve();
      }, this.forceTime);
    });

    this.nodes = nodes;
  }

  computeISFineProject() {
    const nodes = this.nodes;
    if (!nodes[0].projection) {
      console.log('No Projection Data. Should use "fineWithProjection".');
      nodes.forEach((node) => {
        node.projection = [Math.random(), Math.random()];
      });
    }
    const x = d3
      .scaleLinear()
      .domain(d3.extent(nodes, (node) => node.projection[0]))
      .range([this.projectPadding[0], this.width - this.projectPadding[0]]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(nodes, (node) => node.projection[1]))
      .range([this.projectPadding[1], this.height - this.projectPadding[1]]);
    nodes.forEach((node) => {
      node.projectPos = [x(node.projection[0]), y(node.projection[1])];
    });
  }

  get nprobeClusters() {
    return this.clusters.filter((cluster) =>
      this.searchRes.csResIds.find((id) => id == cluster.clusterId)
    );
  }

  get nonNprobeClusters() {
    return this.viewType === VIEW_TYPE.Overview
      ? this.clusters
      : this.clusters.filter(
          (cluster) =>
            !this.searchRes.csResIds.find((id) => id == cluster.clusterId)
        );
  }

  get topKNodes() {
    return this.nodes.filter((node) =>
      this.searchRes.fsResIds.find((id) => id == node.id)
    );
  }

  get nonTopKNodes() {
    return this.nodes.filter(
      (node) => !this.searchRes.fsResIds.find((id) => id == node.id)
    );
  }

  async overview({ dom = this.dom }) {
    this.setDom(dom);
    this.initCanvas();
    this.viewType = VIEW_TYPE.Overview;
    this._renderVoronoiView();
    this._mouseListener();
  }

  async search({ searchRes = null, dom = this.dom }) {
    this.setDom(dom);
    this.searchComputeFinished = false;
    this.searchComputePromise = new Promise(async (resolve, reject) => {
      this.overviewForceFinished || (await this.overviewForcePromise);
      if (searchRes) {
        this.searchRes = searchRes;
        await this.computeISCoarseVoronoi();
        this.coarseSearch();
        this.computeISFinePolarPromise = this.computeISFinePolar();
        await this.computeISFinePolarPromise;
        this.computeISFineProject();
      } else {
        if (!this.searchRes) {
          console.error('please input the target-vector.');
          return;
        } else {
          console.log('no target-vector found, use the last query.');
        }
      }
      this.searchComputeFinished = true;
      resolve();
    });
  }

  coarseSearch() {
    // console.log('coarse search');
    this.viewType = VIEW_TYPE.Search;
    this.step = STEP.CoarseSearch;
    this.initCanvas();
    this._renderVoronoiView();
    this._mouseListener();
  }

  fineSearch() {
    this.viewType = VIEW_TYPE.Search;
    this.step = STEP.FineSearch;
    this.initCanvas();
    this._renderNodeView();
    this._mouseListener();
  }

  async _renderVoronoiView() {
    this.overviewForceFinished || (await this.overviewForcePromise);

    const ctx = this.canvas.getContext('2d');
    const viewType = this.viewType;

    this._renderBackground({ ctx });

    this._renderVoronoiClusters({ ctx });

    viewType === VIEW_TYPE.Search && this._renderVoronoiNprobeClusters({ ctx });

    this.mouse && this._renderVoronoiHover({ ctx, viewType });

    viewType === VIEW_TYPE.Search && this._renderTarget({ ctx });

    // this._renderVoronoiAttr({ ctx, viewType, attr: 'clusterId' });
  }

  _renderBackground({ ctx }) {
    drawRect({
      ctx,
      width: this.width,
      height: this.height,
      hasFill: true,
      fillStyle: backgroundColor,
    });
  }

  _renderVoronoiClusters({ ctx }) {
    const pointsList =
      this.viewType === VIEW_TYPE.Overview
        ? this.clusters.map((cluster) => cluster.OVPolyPoints)
        : this.nonNprobeClusters.map((cluster) => cluster.SVPolyPoints);
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: blackColor,
      lineWidth: voronoiStrokeWidth,
      hasFill: true,
      fillStyle: hexWithOpacity(ZBlue, 1),
    });
    // pointsList.forEach((points) =>
    //   drawVoronoiWithDots({
    //     ctx,
    //     points,
    //     hasStroke: true,
    //     strokeStyle: blackColor,
    //     lineWidth: voronoiStrokeWidth * 2,
    //     hasFill: false,
    //     dotColor: hexWithOpacity(ZBlue, 0.8),
    //     dotR: 1.5,
    //     dotGap: 1.5,
    //     dotAngle: Math.PI / 12,
    //   })
    // );
  }

  _renderVoronoiNprobeClusters({ ctx }) {
    const pointsList = this.nprobeClusters.map(
      (cluster) => cluster.SVPolyPoints
    );
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: blackColor,
      lineWidth: voronoiStrokeWidth,
      hasFill: true,
      fillStyle: hexWithOpacity(ZYellow, 1),
    });
    // pointsList.forEach((points) =>
    //   drawVoronoiWithDots({
    //     ctx,
    //     points,
    //     hasStroke: true,
    //     strokeStyle: blackColor,
    //     lineWidth: voronoiStrokeWidth * 2,
    //     hasFill: false,
    //     // fillStyle: hexWithOpacity(blackColor, 1),
    //     dotColor: hexWithOpacity(ZYellow, 1),
    //     dotR: 2,
    //     dotGap: 2,
    //     dotAngle: Math.PI / 12,
    //   })
    // );
  }

  _renderVoronoiHover({ ctx }) {
    const hoverClusterId = this.hoverClusterId;
    const pointsList = this.clusters
      .filter((cluster) => cluster.clusterId == hoverClusterId)
      .map((cluster) =>
        this.viewType === VIEW_TYPE.Overview
          ? cluster.OVPolyPoints
          : cluster.SVPolyPoints
      );
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: blackColor,
      lineWidth: voronoiStrokeWidth,
      hasFill: true,
      fillStyle: whiteColor,
    });
    // pointsList.forEach((points) =>
    //   drawVoronoiWithDots({
    //     ctx,
    //     points,
    //     hasStroke: true,
    //     strokeStyle: blackColor,
    //     lineWidth: voronoiStrokeWidth * 2,
    //     hasFill: false,
    //     dotColor: hexWithOpacity(whiteColor, 1),
    //     dotR: 2,
    //     dotGap: 2,
    //     dotAngle: Math.PI / 12,
    //   })
    // );
  }

  _renderTarget({ ctx }) {
    const circle =
      this.step === STEP.CoarseSearch
        ? [...this.targetNode.SVPos, targetNodeR]
        : [...this.targetNode.polarPos, targetNodeR];
    drawCircle({
      ctx,
      circles: [circle],
      hasStroke: true,
      strokeStyle: whiteColor,
      lineWidth: targetNodeStrokeWidth,
    });
  }

  _renderNodeView() {
    const ctx = this.canvas.getContext('2d');
    const stepType = this.stepType;

    this._renderBackground({ ctx });
    stepType === STEP_TYPE.Polar && this._renderPolarAxis({ ctx });
    this._renderNodes({ ctx });
    this.hoverNode && this._renderNodeHover({ ctx });
    stepType === STEP_TYPE.Polar && this._renderTarget({ ctx });
  }

  _renderNodeHover({ ctx }) {
    const hoverNode = this.hoverNode;
    const stepType = this.stepType;
    const posAttr = stepType === STEP_TYPE.Polar ? 'polarPos' : 'projectPos';
    drawCircle({
      ctx,
      circles: [[...hoverNode[posAttr], hoverNodeR]],
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[hoverNode.polarOrder], 1),
      hasStroke: true,
      strokeStyle: hexWithOpacity(whiteColor, 1),
      lineWidth: hoverNodeStrokeWidth,
    });
  }

  _renderPolarAxis({ ctx }) {
    const circles = d3
      .range(5)
      .map((i) => [...this.polarOrigin, (0.2 * i + 0.15) * this.polarMaxR]);
    drawCircle({
      ctx,
      circles,
      hasStroke: true,
      lineWidth: polarAxisStrokeWidth,
      strokeStyle: hexWithOpacity(voronoiHighlightColor, polarAxisOpacity),
    });
  }

  _renderNodes({ ctx }) {
    const stepType = this.stepType;
    const nonTopKCircles =
      stepType === STEP_TYPE.Polar
        ? this.nonTopKNodes.map((node) => [
            ...node.polarPos,
            nonTopKNodeR,
            node.polarOrder,
          ])
        : this.nonTopKNodes.map((node) => [
            ...node.projectPos,
            nonTopKNodeR,
            node.polarOrder,
          ]);
    const topKCircles =
      stepType === STEP_TYPE.Polar
        ? this.topKNodes.map((node) => [
            ...node.polarPos,
            topKNodeR,
            node.polarOrder,
          ])
        : this.topKNodes.map((node) => [
            ...node.projectPos,
            topKNodeR,
            node.polarOrder,
          ]);
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = nonTopKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], nonTopKNodeOpacity),
      });
    }
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = topKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], topKNodeOpacity),
        hasStroke: true,
        strokeStyle: hexWithOpacity(whiteColor, 1),
        lineWidth: topKNodeStrokeWidth,
      });
    }
  }

  async switchStep(step, stepType = undefined) {
    if (this.viewType !== VIEW_TYPE.Search) {
      console.error('Only when searching can switch steps.');
      return;
    }

    const oldStep = this.step;
    const oldStepType = this.stepType;
    this.step = step;
    this.stepType = stepType;

    // console.log('switch step', oldStep, step, oldStepType, stepType);

    if (step === oldStep && stepType === oldStepType) return;

    this.searchComputeFinished || (await this.searchComputePromise);

    this.initCanvas({ dom: this.dom });
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');

    // Coarse => Fine
    if (oldStep === STEP.CoarseSearch && step === STEP.FineSearch) {
      const timer = d3.timer((elapsed) => {
        this._renderBackground({ ctx });

        this._animate_nonNprobeCluster({
          ctx,
          elapsed,
          duration: stepExitTime,
          delay: 0,
          animationType: ANiMATION_TYPE.Exit,
        });

        this._animate_nprobeClusterTrans({
          ctx,
          elapsed,
          duration: stepExitTime,
          delay: 0,
          animationType: ANiMATION_TYPE.Exit,
        });

        // stepType === STEP_TYPE.Polar &&
        this._animate_targetNode({
          ctx,
          elapsed,
          duration: stepExitTime,
          delay: 0,
          animationType: ANiMATION_TYPE.Enter,
        });

        this._animate_nprobeClusterOpacity({
          ctx,
          elapsed,
          duration: stepEnterTime,
          delay: stepExitTime,
          animationType: ANiMATION_TYPE.Exit,
        });

        this._animate_nodeOpacityAndTrans({
          ctx,
          elapsed,
          duration: stepEnterTime,
          delay: stepExitTime,
          animationType: ANiMATION_TYPE.Enter,
          stepType,
        });

        if (elapsed >= stepAllTime) {
          console.log('Coarse => Fine [OK]');
          timer.stop();
          this.fineSearch(); //
        }
      });
    }

    // Fine => Coarse
    if (oldStep === STEP.FineSearch && step === STEP.CoarseSearch) {
      const timer = d3.timer((elapsed) => {
        this._renderBackground({ ctx });

        this._animate_nonNprobeCluster({
          ctx,
          elapsed,
          duration: stepEnterTime,
          delay: stepExitTime,
          animationType: ANiMATION_TYPE.Enter,
        });

        this._animate_nprobeClusterTrans({
          ctx,
          elapsed,
          duration: stepEnterTime,
          delay: stepExitTime,
          animationType: ANiMATION_TYPE.Enter,
        });

        this._animate_targetNode({
          ctx,
          elapsed,
          duration: stepEnterTime,
          delay: stepExitTime,
          animationType: ANiMATION_TYPE.Exit,
        });

        this._animate_nprobeClusterOpacity({
          ctx,
          elapsed,
          duration: stepExitTime,
          delay: 0,
          animationType: ANiMATION_TYPE.Enter,
        });

        this._animate_nodeOpacityAndTrans({
          ctx,
          elapsed,
          duration: stepExitTime,
          delay: 0,
          animationType: ANiMATION_TYPE.Exit,
          stepType: oldStepType,
        });

        if (elapsed >= stepAllTime) {
          console.log('Fine => Coarse [OK]');
          timer.stop();
          this.coarseSearch(); //
        }
      });
    }

    // Intra - Fine, just node trans
    if (oldStep === STEP.FineSearch && step === STEP.FineSearch) {
      const timer = d3.timer((elapsed) => {
        this._renderBackground({ ctx });
        this._animate_nodeTrans({
          ctx,
          elapsed,
          duration: nodeTransTime,
          delay: 0,
          stepType,
        });

        if (elapsed >= nodeTransTime) {
          console.log(`${oldStepType} To ${stepType} OK!`);
          timer.stop();
          this.fineSearch();
        }
      });
    }
  }

  _animate_nonNprobeCluster({ ctx, elapsed, duration, delay, animationType }) {
    let t = this.ease((elapsed - delay) / duration);
    if (t > 1 || t < 0) return;
    t = animationType === ANiMATION_TYPE.Enter ? 1 - t : t;
    const opacity = 1 - t;
    const pointsList = this.nonNprobeClusters.map(
      (cluster) => cluster.SVPolyPoints
    );
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: hexWithOpacity(voronoiHighlightColor, opacity),
      lineWidth: voronoiStrokeWidth,
    });
  }
  _animate_nprobeClusterTrans({
    ctx,
    elapsed,
    duration,
    delay,
    animationType,
  }) {
    let t = this.ease((elapsed - delay) / duration);
    if (t > 1 || t < 0) return;
    t = animationType === ANiMATION_TYPE.Enter ? 1 - t : t;

    const pointsList = this.nprobeClusters.map((cluster) =>
      cluster.SVPolyPoints.map((point) => [
        point[0] + t * cluster.SVNextLevelTran[0],
        point[1] + t * cluster.SVNextLevelTran[1],
      ])
    );
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: whiteColor,
      lineWidth: voronoiStrokeWidth,
      hasFill: true,
      fillStyle: voronoiHighlightColor,
    });
  }
  _animate_targetNode({ ctx, elapsed, duration, delay, animationType }) {
    let t = this.ease((elapsed - delay) / duration);
    const stepType = this.stepType;
    if (stepType === STEP_TYPE.Project) {
      if (t < 0 || t > 1) return;
    }
    if (t > 1) t = 1;
    if (t < 0) t = 0;
    t = animationType === ANiMATION_TYPE.Enter ? 1 - t : t;
    const x =
      this.targetNode.SVPos[0] * t + this.targetNode.polarPos[0] * (1 - t);
    const y =
      this.targetNode.SVPos[1] * t + this.targetNode.polarPos[1] * (1 - t);

    drawCircle({
      ctx,
      circles: [[x, y, targetNodeR]],
      hasStroke: true,
      strokeStyle: whiteColor,
      lineWidth: targetNodeStrokeWidth,
    });
  }
  _animate_nprobeClusterOpacity({
    ctx,
    elapsed,
    duration,
    delay,
    animationType,
  }) {
    let t = this.ease((elapsed - delay) / duration);
    if (t > 1 || t < 0) return;
    t = animationType === ANiMATION_TYPE.Enter ? 1 - t : t;
    const opacity = 1 - t;
    const pointsList = this.nprobeClusters.map((cluster) =>
      cluster.SVPolyPoints.map((point) => [
        point[0] + cluster.SVNextLevelTran[0],
        point[1] + cluster.SVNextLevelTran[1],
      ])
    );
    drawVoronoi({
      ctx,
      pointsList,
      hasStroke: true,
      strokeStyle: hexWithOpacity(whiteColor, opacity),
      lineWidth: voronoiStrokeWidth,
      hasFill: true,
      fillStyle: hexWithOpacity(voronoiHighlightColor, opacity),
    });
  }
  _animate_nodeOpacityAndTrans({
    ctx,
    elapsed,
    duration,
    delay,
    animationType,
    stepType,
  }) {
    let t = this.ease((elapsed - delay) / duration);
    if (t > 1 || t < 0) return;
    t = animationType === ANiMATION_TYPE.Enter ? 1 - t : t;

    stepType === STEP_TYPE.Polar && this._renderPolarAxis({ ctx });

    const nonTopKCircles =
      stepType === STEP_TYPE.Polar
        ? this.nonTopKNodes.map((node) => [
            t * node.voronoiPos[0] + (1 - t) * node.polarPos[0],
            t * node.voronoiPos[1] + (1 - t) * node.polarPos[1],
            nonTopKNodeR,
            node.polarOrder,
          ])
        : this.nonTopKNodes.map((node) => [
            t * node.voronoiPos[0] + (1 - t) * node.projectPos[0],
            t * node.voronoiPos[1] + (1 - t) * node.projectPos[1],
            nonTopKNodeR,
            node.polarOrder,
          ]);
    const topKCircles =
      stepType === STEP_TYPE.Polar
        ? this.topKNodes.map((node) => [
            t * node.voronoiPos[0] + (1 - t) * node.polarPos[0],
            t * node.voronoiPos[1] + (1 - t) * node.polarPos[1],
            topKNodeR,
            node.polarOrder,
          ])
        : this.topKNodes.map((node) => [
            t * node.voronoiPos[0] + (1 - t) * node.projectPos[0],
            t * node.voronoiPos[1] + (1 - t) * node.projectPos[1],
            topKNodeR,
            node.polarOrder,
          ]);
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = nonTopKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], nonTopKNodeOpacity),
      });
    }
    const opacity = t * 0.5 + (1 - t) * topKNodeOpacity;
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = topKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], opacity),
        hasStroke: true,
        strokeStyle: hexWithOpacity(whiteColor, opacity),
        lineWidth: topKNodeStrokeWidth,
      });
    }
  }
  _animate_nodeTrans({ ctx, elapsed, duration, delay, stepType }) {
    let t = this.ease((elapsed - delay) / duration);
    if (t > 1 || t < 0) return;

    t = stepType === STEP_TYPE.Polar ? 1 - t : t;

    const nonTopKCircles = this.nonTopKNodes.map((node) => [
      t * node.projectPos[0] + (1 - t) * node.polarPos[0],
      t * node.projectPos[1] + (1 - t) * node.polarPos[1],
      nonTopKNodeR,
      node.polarOrder,
    ]);
    const topKCircles = this.topKNodes.map((node) => [
      t * node.projectPos[0] + (1 - t) * node.polarPos[0],
      t * node.projectPos[1] + (1 - t) * node.polarPos[1],
      topKNodeR,
      node.polarOrder,
    ]);
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = nonTopKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], nonTopKNodeOpacity),
      });
    }
    for (let i = 0; i < this.nprobeClusters.length; i++) {
      let circles = topKCircles.filter((circle) => circle[3] == i);
      drawCircle({
        ctx,
        circles,
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], topKNodeOpacity),
        hasStroke: true,
        strokeStyle: hexWithOpacity(whiteColor, topKNodeOpacity),
        lineWidth: topKNodeStrokeWidth,
      });
    }
  }

  _voronoiMouseHandler() {
    const voronoi =
      this.viewType === VIEW_TYPE.Overview ? this.OVVoronoi : this.SVVronoi;
    const hoverClusterId = voronoi.delaunay.find(this.mouse.x, this.mouse.y);
    // console.log(hoverClusterId, this.hoverClusterId);
    if (hoverClusterId !== this.hoverClusterId) {
      this.hoverClusterId = hoverClusterId;
      this._renderVoronoiView();
    }
  }
  _nodeMouseHandler() {
    const { x, y } = this.mouse;
    const stepType = this.stepType;
    const posAttr = stepType === STEP_TYPE.Polar ? 'polarPos' : 'projectPos';

    const hoverNode =
      this.topKNodes.find((node) =>
        inCircle(x, y, ...node[posAttr], topKNodeR, inCircleBias)
      ) ||
      this.nonTopKNodes.find((node) =>
        inCircle(x, y, ...node[posAttr], nonTopKNodeR, inCircleBias)
      ) ||
      null;
    if (hoverNode !== this.hoverNode) {
      this.hoverNode = hoverNode;
      this._renderNodeView();
    }
  }
  _voronoiClickHandler() {
    const { x, y } = this.mouse;
    const voronoi =
      this.viewType === VIEW_TYPE.Overview ? this.OVVoronoi : this.SVVronoi;
    const clickedClusterId = voronoi.delaunay.find(x, y);
    const clickedCluster = this.clusters.find(
      (cluster) => cluster.clusterId == clickedClusterId
    );
    this.voronoiClickHandler({ x, y, clickedClusterId, clickedCluster });
  }
  _nodeClickHandler() {
    const { x, y } = this.mouse;
    const stepType = this.stepType;
    const posAttr = stepType === STEP_TYPE.Polar ? 'polarPos' : 'projectPos';

    const clickedNode =
      this.topKNodes.find((node) =>
        inCircle(x, y, ...node[posAttr], topKNodeR, inCircleBias)
      ) ||
      this.nonTopKNodes.find((node) =>
        inCircle(x, y, ...node[posAttr], nonTopKNodeR, inCircleBias)
      ) ||
      null;
    const clickedNodeId = clickedNode ? clickedNode.id : null;
    clickedNodeId &&
      this.nodeClickHandler({ x, y, clickedNodeId, clickedNode });
  }
  _mouseListener() {
    const canvas = this.canvas;
    canvas.addEventListener('mousemove', (e) => {
      const { offsetX: x, offsetY: y } = e;
      // console.log('mouse', x, y);
      this.mouse = { x: x * 2, y: y * 2 };
      if (this.step === STEP.FineSearch) {
        this._nodeMouseHandler();
      } else {
        this._voronoiMouseHandler();
      }
    });
    canvas.addEventListener('click', (e) => {
      const { offsetX: x, offsetY: y } = e;
      // console.log('mouse', x, y);
      this.mouseClick = { x: x * 2, y: y * 2 };
      if (this.step === STEP.FineSearch) {
        this._nodeClickHandler();
      } else {
        this._voronoiClickHandler();
      }
    });
    this.step === STEP.FineSearch ||
      canvas.addEventListener('mouseleave', () => {
        this.mouse = null;
        // console.log('mouseleave');
        this._renderVoronoiView();
      });
  }
}
