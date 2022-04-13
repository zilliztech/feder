import * as d3 from 'd3';
import BaseView from './BaseView.js';
import {
  drawCircle,
  drawEllipse,
  drawPath,
  drawLines,
  drawLinesWithLinearGradient,
  drawRect,
  hexWithOpacity,
  highLightColor,
  selectedColor,
  ZBlue,
  ZYellow,
  ZOrange,
  ZLayerBorder,
  whiteColor,
  highLightGradientStopColors,
  neighbourGradientStopColors,
  normalGradientStopColors,
  layerGradientStopColors,
  targetLevelGradientStopColors,
} from './render.js';
import {
  deDupLink,
  colorScheme,
  inCircle,
  dist2,
  dist,
  shortenLine,
  getNodeIdWithLevel,
  getLinkIdWithLevel,
  getEntryLinkIdWithLevel,
  getInprocessPos,
  showVectors,
} from '../Utils/index.js';
import transformNodes from './transformNodes.js';
import scaleNodes from './scaleNodes.js';
import parseVisRecords from './parseVisRecords.js';
import { HNSW_LINK_TYPE, HNSW_NODE_TYPE } from '../Utils/config.js';
import forceSearchView from './forceSearchView.js';
import computeSearchViewTransition from './computeSearchViewTransition.js';
import TimerController from './TimerController.js';
import TimeControllerView from './TimeControllerView.js';

const HoveredPanelLine_1_x = 60;
const HoveredPanelLine_1_y = -60;
const HoveredPanelLine_2_x = 140;

const ellipseRation = 1.4;

export default class HnswView extends BaseView {
  constructor({
    width,
    height,
    forceTime = 3000,
    padding = [150, 280, 50, 280],
    itemType = null,
    hoverCallback = () => null,
    getVectorById = () => null,
  } = {}) {
    super({ width, height, forceTime, padding, getVectorById });

    this.forceTime = forceTime;
    this.itemType = itemType;
    this.hoverCallback = hoverCallback;

    this.dom = null;
    this.searchRes = null;
    this.indexMeta = null;
    this.computeOverviewPromise = null;
    this.searchTransitionTimer = null;

    this.isSelected = false;

    this.selectedNode = null;
    this.highlightLinksLevels = [];
    this.highlightNodesLevels = [];

    this.targetOrigin = [0, 0];
    this.searchInterLevelTime = 300;
    this.searchIntraLevelTime = 100;
  }
  computeIndexOverview({ indexMeta }) {
    // console.log('computeIndexOverview', indexMeta);
    this.indexMeta = indexMeta;
    const padding = this.padding;
    const allNodes = indexMeta.visData;
    const internalId2Node = {};
    allNodes.forEach((node) => (internalId2Node[node.internalId] = node));
    this.internalId2Node = internalId2Node;
    const numOverviewLevels = d3.max(allNodes, (d) => d.linksLevels.length);
    this.numOverviewLevels = numOverviewLevels;
    // this.M = d3.max(allNodes, (node) =>
    //   d3.max(node.linksLevels, (links) => links.length)
    // );
    const M = indexMeta.M;

    const nodesLevels = [];
    const linksLevels = [];

    const width = this.width - padding[1] - padding[3];
    const height = (this.height - padding[0] - padding[2]) / numOverviewLevels;
    this.computeOverviewPromise = new Promise(async (resolve) => {
      for (let level = numOverviewLevels - 1; level >= 0; level--) {
        const nodes = allNodes.filter(
          (node) => node.linksLevels.length > level
        );
        const links =
          // deDupLink(
          nodes.reduce(
            (acc, curNode) =>
              acc.concat(
                curNode.linksLevels[level].map((target) => ({
                  source: curNode.internalId,
                  target,
                }))
              ),
            []
          );
        // );
        await this.forceLevel({ nodes, links, width, height });
        level > 0 && scaleNodes({ nodes, M });
        level > 0 && this.fixedCurLevel({ nodes });
        nodesLevels[level] = nodes;
        linksLevels[level] = links;
      }

      const { layerPosLevels, transformFunc } = transformNodes({
        nodesLevels,
        width: this.width,
        height: this.height,
        padding,
      });
      this.layerPosLevels = layerPosLevels;
      nodesLevels.forEach((nodes, level) => {
        nodes.forEach((node) => {
          node.overviewPosLevels = d3
            .range(level + 1)
            .map((i) => transformFunc(node.x, node.y, i));
          node.r = 2 + 1.5 * node.overviewPosLevels.length;
        });
      });

      this.nodes = allNodes;
      this.nodesLevels = nodesLevels;
      this.linksLevels = linksLevels;
      resolve();
    });
  }
  async forceLevel({ nodes, links }) {
    return new Promise((resolve) => {
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d) => d.internalId)
            .strength(1)
        )
        // .force(
        //   'collide',
        //   d3.forceCollide().radius((_) => 12)
        // )
        .force('center', d3.forceCenter(0, 0))
        .force('charge', d3.forceManyBody().strength(-500));
      // .on('tick', () => {
      //   nodes.forEach((node) => {
      //     node.x = Math.max(0, Math.min(width, node.x));
      //     node.y = Math.max(0, Math.min(height, node.y));
      //   });
      // });
      setTimeout(() => {
        simulation.stop();
        resolve();
      }, this.forceTime);
    });
  }
  fixedCurLevel({ nodes }) {
    nodes.forEach((node) => {
      node.fx = node.x;
      node.fy = node.y;
    });
  }
  async overview({ dom = this.dom }) {
    this.setDom(dom);
    // this.initCanvas();
    this.computeOverviewPromise && (await this.computeOverviewPromise);

    const ctx = this.canvas.getContext('2d');
    this.selectedNode = null;
    this.selectedLevel = null;
    this.renderOverview({ ctx });

    const overviewInfo = [
      {
        title: 'HNSW',
      },
      {
        title: `M = ${this.indexMeta.M}, ef_construction = ${this.indexMeta.ef_construction}`,
      },
      {
        title: `${this.indexMeta.ntotal} vectors, including ${this.indexMeta.levelCount} levels (only show the top 3 levels).`,
      },
    ];
    for (let level = this.numOverviewLevels - 1; level >= 0; level--) {
      const nodes = this.nodesLevels[level];
      const links = this.linksLevels[level];
      overviewInfo.push({
        isFlex: true,
        title: `Level ${
          level + this.indexMeta.levelCount - this.numOverviewLevels
        }`,
        text: `${nodes.length} vectors, ${links.length} links`,
      });
    }
    this._renderOverviewPanel(overviewInfo, whiteColor);

    this._mouseListener();
    this.mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { selectedLevel, selectedNode } = this.getSelectedNode({
        mouse,
        layerPosLevels: this.layerPosLevels,
        nodesLevels: this.nodesLevels,
        posAttr: 'overviewPosLevels',
      });
      // console.log(selectedNode);
      this.selectedNodeChanged =
        this.selectedLevel !== selectedLevel ||
        this.selectedNode !== selectedNode;
      this.selectedLevel = selectedLevel;
      this.selectedNode = selectedNode;

      if (this.selectedNodeChanged) {
        this.setHighlightNodesAndLinks(selectedLevel, selectedNode);
        this.renderOverview({ ctx });

        const itemList = [];
        if (!!this.selectedNode) {
          itemList.push({
            title: `Level ${
              selectedLevel + this.indexMeta.levelCount - this.numOverviewLevels
            }`,
          });
          itemList.push({
            title: `Row No. ${selectedNode.id}`,
          });
          this.itemType === 'img' &&
            itemList.push({
              isImg: true,
              imgUrl: this.hoverCallback(selectedNode.id),
            });
          itemList.push({
            title: `Shortest path from the entry:`,
            text: `${[...selectedNode.path, selectedNode.id].join(' => ')}`,
          });
          itemList.push({
            title: `Linked vectors:`,
            text: `${selectedNode.linksLevels[selectedLevel].join(', ')}`,
          });
          itemList.push({
            title: `Vectors:`,
            text: `${showVectors(this.getVectorById(selectedNode.id))}`,
          });
        }
        this._renderSelectedPanel(itemList, ZYellow);
      }
    };
    this.mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { selectedLevel, selectedNode } = this.getSelectedNode({
        mouse,
        layerPosLevels: this.layerPosLevels,
        nodesLevels: this.nodesLevels,
        posAttr: 'overviewPosLevels',
      });
      this.hoveredNodeChanged =
        this.hoveredLevel !== selectedLevel ||
        this.hoveredNode !== selectedNode;
      this.hoveredNode = selectedNode;
      this.hoveredLevel = selectedLevel;

      if (this.hoveredNodeChanged && !this.selectedNode) {
        this.setHighlightNodesAndLinks(selectedLevel, selectedNode);
      }

      this.renderOverview({ ctx });
    };
  }
  getSelectedNode({ mouse, layerPosLevels, nodesLevels, posAttr }) {
    const selectedLevel = layerPosLevels.findIndex((points) =>
      d3.polygonContains(points, mouse)
    );
    let selectedNode;
    if (selectedLevel >= 0) {
      const allDis = nodesLevels[selectedLevel].map((node) =>
        dist2(node[posAttr][selectedLevel], mouse)
      );
      const minDistIndex = d3.minIndex(allDis);
      const minDist = allDis[minDistIndex];
      const clearestNode = nodesLevels[selectedLevel][minDistIndex];
      selectedNode =
        minDist < Math.pow(clearestNode.r + 5, 2) ? clearestNode : null;
    } else {
      selectedNode = null;
    }
    return { selectedLevel, selectedNode };
  }
  setHighlightNodesAndLinks(keyLevel, keyNode) {
    let highlightLinksLevels = this.nodesLevels.map((_) => []);
    let highlightNodesLevels = this.nodesLevels.map((_) => []);
    if (keyNode) {
      const path = [...keyNode.path, keyNode.internalId];
      if (path.length === 0) {
        highlightNodesLevels = [keyNode.overviewPosLevels[keyLevel]];
      } else {
        let preNodeId = path[0];
        let preNode = this.internalId2Node[preNodeId];
        let preLevel = this.numOverviewLevels - 1;
        highlightNodesLevels[preLevel].push(preNode);
        for (let i = 1; i < path.length; i++) {
          let curNodeId = path[i];
          let curNode = this.internalId2Node[curNodeId];
          while (curNode.overviewPosLevels.length <= preLevel) {
            preLevel -= 1;
            highlightLinksLevels[preLevel].push({
              source: preNode,
              target: preNode,
            });
            highlightNodesLevels[preLevel].push(preNode);
          }
          highlightNodesLevels[preLevel].push(curNode);
          highlightLinksLevels[preLevel].push({
            source: preNode,
            target: curNode,
          });
          preNode = curNode;
        }
        while (preLevel > keyLevel) {
          preLevel -= 1;
          highlightLinksLevels[preLevel].push({
            source: preNode,
            target: preNode,
          });
          highlightNodesLevels[preLevel].push(preNode);
        }
      }
    }
    this.highlightLinksLevels = highlightLinksLevels;
    this.highlightNodesLevels = highlightNodesLevels;
  }
  renderOverview({ ctx }) {
    // console.log('render overview');
    this.renderBackground({ ctx });
    for (let level = 0; level < this.numOverviewLevels; level++) {
      this.renderOverviewLevelLayer({ ctx, level });
      const nodes = this.nodesLevels[level];
      const links = this.linksLevels[level];
      level > 0 && this.renderLinks({ ctx, links, level });
      this.renderNodes({ ctx, nodes, level });

      const isSelected = !!this.selectedNode;
      const curNode = isSelected ? this.selectedNode : this.hoveredNode;
      const isActive = !!curNode; // clicked or hoverd;
      const curLevel = isSelected ? this.selectedLevel : this.hoveredLevel;
      const preActiveNodeId =
        isActive && curNode.path.length > 0
          ? curNode.path[curNode.path.length - 1]
          : '';
      const neighboursNodes =
        curLevel === level && isActive
          ? curNode.linksLevels[curLevel]
              .filter((nodeId) => nodeId != preActiveNodeId)
              .map((nodeId) => this.internalId2Node[nodeId])
          : [];
      const neighboursLinks =
        curLevel === level && isActive
          ? links.filter(
              (link) =>
                link.source.internalId == curNode.internalId &&
                link.target.internalId != preActiveNodeId
            )
          : [];
      isActive &&
        this.renderNeighbours({
          ctx,
          nodes: neighboursNodes,
          links: neighboursLinks,
          level,
        });

      const highlightLinks = this.highlightLinksLevels[level] || [];
      // console.log(level, highlightLinks);
      const highlightNodes = this.highlightNodesLevels[level] || [];
      this.renderhighlightLinks({ ctx, highlightLinks, level });
      this.renderhighlightNodes({ ctx, highlightNodes, level });
    }
    if (!!this.hoveredNode) {
      const [x, y] = this.hoveredNode.overviewPosLevels[this.hoveredLevel];
      const originX =
        (this.width - this.padding[1] - this.padding[3]) / 2 + this.padding[3];
      const isLeft = !this.selectedNode
        ? originX > x
        : this.selectedNode.overviewPosLevels[this.selectedLevel][0] > x;

      this.renderHoveredPanelLine({ ctx, x, y, isLeft });
    } else {
      this._renderHoveredPanel([], ZYellow);
    }
  }
  renderHoveredPanelLine({ ctx, x, y, isLeft }) {
    const k = isLeft ? -1 : 1;
    const endX = x + HoveredPanelLine_1_x * k + HoveredPanelLine_2_x * k;
    const endY = y + HoveredPanelLine_1_y * k;
    const points = [
      [x, y],
      [x + HoveredPanelLine_1_x * k, y + HoveredPanelLine_1_y * k],
      [
        x + HoveredPanelLine_1_x * k + HoveredPanelLine_2_x * k,
        y + HoveredPanelLine_1_y * k,
      ],
    ];
    drawPath({
      ctx,
      points,
      withZ: false,
      hasStroke: true,
      strokeStyle: hexWithOpacity(ZYellow, 1),
      lineWidth: 2,
    });
    const itemList = [];
    if (!!this.hoveredNode) {
      itemList.push({
        text: `No. ${this.hoveredNode.id}`,
        textWithMargin: true,
        noWrap: true,
      });
      this.itemType === 'img' &&
        itemList.push({
          isImg: true,
          imgUrl: this.hoverCallback(this.hoveredNode.id),
        });

      this._renderHoveredPanel(itemList, ZYellow, endX, endY, isLeft);
    } else {
      this._renderHoveredPanel(itemList, ZYellow);
    }
  }
  renderBackground({ ctx }) {
    drawRect({
      ctx,
      width: this.width,
      height: this.height,
      hasFill: true,
      fillStyle: '#000',
    });
  }
  renderOverviewLevelLayer({ ctx, level }) {
    const points = this.layerPosLevels[level];
    this.renderLevelLayer({ ctx, points });
  }
  renderSearchViewLevelLayer({ ctx, level }) {
    const points = this.searchLayerPosLevels[level];
    this.renderLevelLayer({ ctx, points });
  }
  renderLevelLayer({ ctx, points, layerDot = 26 }) {
    drawPath({
      ctx,
      points,
      hasStroke: true,
      isStrokeLinearGradient: false,
      strokeStyle: hexWithOpacity(ZLayerBorder, 0.6),
      lineWidth: 1,
      hasFill: true,
      isFillLinearGradient: true,
      gradientStopColors: layerGradientStopColors,
      gradientPos: [points[1][0], points[0][1], points[3][0], points[2][1]],
    });

    const rightTopLength = dist(points[0], points[1]);
    const leftTopLength = dist(points[0], points[3]);
    const rightTopDotNum = layerDot;
    // const leftTopDotNum = (layerDot / rightTopLength) * leftTopLength;
    const leftTopDotNum = layerDot;
    const rightTopVec = [
      points[1][0] - points[0][0],
      points[1][1] - points[0][1],
    ];
    const leftTopVec = [
      points[3][0] - points[0][0],
      points[3][1] - points[0][1],
    ];
    const dots = [];
    d3.range(0.02, 0.98, 1 / rightTopDotNum).forEach((rightTopT) =>
      d3.range(0.02, 0.98, 1 / leftTopDotNum).forEach((leftTopT) => {
        dots.push([
          points[0][0] + rightTopVec[0] * rightTopT + leftTopVec[0] * leftTopT,
          points[0][1] + rightTopVec[1] * rightTopT + leftTopVec[1] * leftTopT,
          1.5,
        ]);
      })
    );
    drawCircle({
      ctx,
      circles: dots,
      hasFill: true,
      fillStyle: hexWithOpacity(whiteColor, 0.4),
    });
  }
  renderNodes({ ctx, nodes, level }) {
    // console.log(nodes, level);
    drawEllipse({
      ctx,
      circles: nodes.map((node) => [
        ...node.overviewPosLevels[level],
        node.r * ellipseRation,
        node.r,
      ]),
      hasFill: true,
      fillStyle: hexWithOpacity(ZBlue, 0.6),
      shadowColor: ZBlue,
      shadowBlur: 6,
    });
  }
  renderhighlightNodes({
    ctx,
    highlightNodes,
    level,
    posAttr = 'overviewPosLevels',
    color = highLightColor,
    _r = 1,
    shadowColor = highLightColor,
    shadowBlur = 6,
  }) {
    drawEllipse({
      ctx,
      circles: highlightNodes
        .filter((node) => !!node[posAttr][level])
        .map((node) => [
          ...node[posAttr][level],
          (node.r + _r) * ellipseRation,
          node.r + _r,
        ]),
      hasFill: true,
      fillStyle: hexWithOpacity(color, 1),
      shadowColor,
      shadowBlur,
      // hasStroke: true,
      // strokeStyle: hexWithOpacity(whiteColor, 1),
      // lineWidth: 3,
    });
  }
  renderLinks({ ctx, links, level }) {
    const pointsList = links.map((link) =>
      shortenLine(
        link.source.overviewPosLevels[level],
        link.target.overviewPosLevels[level],
        20
      )
    );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      // strokeStyle: hexWithOpacity('#cccccc', 0 + 0.2 * level),
      // lineWidth: 1,
      isStrokeLinearGradient: true,
      gradientStopColors: normalGradientStopColors,
      lineWidth: 4,
      lineCap: 'round',
    });
  }
  renderhighlightLinks({ ctx, highlightLinks, level }) {
    const pointsList = highlightLinks
      .map((link) =>
        link.source === link.target
          ? !!link.source.overviewPosLevels[level + 1]
            ? [
                link.source.overviewPosLevels[level + 1],
                link.target.overviewPosLevels[level],
              ]
            : null
          : [
              link.source.overviewPosLevels[level],
              link.target.overviewPosLevels[level],
            ]
      )
      .filter((a) => a)
      .map((points) => shortenLine(...points, 20));
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 9,
      lineCap: 'round',
    });
  }
  renderNeighbours({ ctx, nodes, links, level }) {
    const pointsList = links
      .map((link) => [
        link.source.overviewPosLevels[level],
        link.target.overviewPosLevels[level],
      ])
      .map((points) => shortenLine(...points, 20));
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: neighbourGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });

    drawEllipse({
      ctx,
      circles: nodes.map((node) => [
        ...node.overviewPosLevels[level],
        (node.r + 1) * ellipseRation,
        node.r + 1,
      ]),
      hasFill: true,
      fillStyle: hexWithOpacity(whiteColor, 1),
      shadowColor: whiteColor,
      shadowBlur: 5,
    });
  }

  async search({ searchRes = null, dom = this.dom } = {}) {
    this.setDom(dom);
    // this.initCanvas();
    const ctx = this.canvas.getContext('2d');

    await this.computeSearchView({ searchRes });

    const overviewInfo = [
      {
        title: 'HNSW',
      },
      {
        title: `M = ${this.indexMeta.M}, ef_construction = ${this.indexMeta.ef_construction}.`,
      },
      {
        title: `k = ${this.searchRes.searchParams.k}, ef_search = ${this.searchRes.searchParams.ef}.`,
      },
      {
        title: `${this.indexMeta.ntotal} vectors, including ${this.indexMeta.levelCount} levels.`,
      },
      {
        title: `During the search, a total of ${
          Object.keys(this.id2forcePos).length - 1
        } of these vectors were visited.`,
      },
    ];
    for (let level = this.indexMeta.levelCount - 1; level >= 0; level--) {
      const nodes = this.searchNodesLevels[level];
      const links = this.searchLinksLevels[level];
      const minDist =
        level > 0
          ? nodes
              .find((node) => node.type === HNSW_NODE_TYPE.Fine)
              .dist.toFixed(3)
          : d3.min(
              nodes.filter((node) => node.type === HNSW_NODE_TYPE.Fine),
              (node) => node.dist
            );
      overviewInfo.push({
        isFlex: true,
        title: `Level ${level}`,
        text: `${nodes.length} vectors, ${links.length} links, min-distance: ${minDist}`,
      });
    }
    this._renderOverviewPanel(overviewInfo, whiteColor);

    const timeControllerView = new TimeControllerView(dom);

    const callback = ({ t, p }) => {
      this.renderSearchViewTransition({ ctx, t });
      timeControllerView.moveSilderBar(p);
    };
    const timer = new TimerController({
      duration: this.searchTransitionDuration,
      callback,
    });
    timeControllerView.setTimer(timer);
    timer.start();
    this.searchTransitionTimer = timer;

    this.selectedNode = null;
    this.selectedLevel = null;

    this._mouseListener();
    this.mouseClickHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { selectedLevel, selectedNode } = this.getSelectedNode({
        mouse,
        layerPosLevels: this.searchLayerPosLevels,
        nodesLevels: this.searchNodesLevels,
        posAttr: 'searchViewPosLevels',
      });
      this.selectedNodeChanged =
        this.selectedLevel !== selectedLevel ||
        this.selectedNode !== selectedNode;
      this.selectedLevel = selectedLevel;
      this.selectedNode = selectedNode;
      if (this.selectedNodeChanged) {
        console.log('mouse', selectedLevel, selectedNode);
        if (this.selectedNodeChanged) {
          const itemList = [];
          if (!!this.selectedNode) {
            itemList.push({
              title: `Level ${selectedLevel}`,
            });
            itemList.push({
              title: `Row No. ${selectedNode.id}`,
            });
            itemList.push({
              title: `Distance to the target: ${selectedNode.dist.toFixed(3)}`,
            });
            this.itemType === 'img' &&
              itemList.push({
                isImg: true,
                imgUrl: this.hoverCallback(selectedNode.id),
              });
            itemList.push({
              title: `Vectors:`,
              text: `${showVectors(this.getVectorById(selectedNode.id))}`,
            });
          }
          console.log('itemList', itemList);
          this._renderSelectedPanel(itemList, ZYellow);
        }

        this.renderSearchViewTransition({
          ctx,
          t: this.searchTransitionTimer.currentT,
        });
      }
    };
    this.mouseMoveHandler = ({ x, y }) => {
      const mouse = [x, y];
      const { selectedLevel, selectedNode } = this.getSelectedNode({
        mouse,
        layerPosLevels: this.searchLayerPosLevels,
        nodesLevels: this.searchNodesLevels,
        posAttr: 'searchViewPosLevels',
      });
      this.hoveredNodeChanged =
        this.hoveredLevel !== selectedLevel ||
        this.hoveredNode !== selectedNode;
      this.hoveredNode = selectedNode;
      this.hoveredLevel = selectedLevel;

      this.renderSearchViewTransition({
        ctx,
        t: this.searchTransitionTimer.currentT,
      });
    };
  }
  searchTransitionSetSpeed(speed) {
    this.searchTransitionTimer.setSpeed(speed);
  }
  searchTransitionRestart() {
    this.searchTransitionTimer.restart();
  }
  searchTransitionPlayPause() {
    this.searchTransitionTimer.playPause();
  }
  searchTransitionSetTime(p) {
    this.searchTransitionTimer.setTimeP(p);
  }
  async computeSearchView({ searchRes }) {
    const targetOrigin = this.targetOrigin;

    // console.log('search', searchRes);
    let visData = [],
      id2forcePos = {};
    if (searchRes !== this.searchRes) {
      this.searchRes = searchRes;
      visData = parseVisRecords(searchRes);
      // console.log('visData', visData);
      this.visData = visData;

      id2forcePos = await forceSearchView(
        this.visData,
        this.targetOrigin,
        this.forceTime * 2
      );
      this.id2forcePos = id2forcePos;
    } else {
      visData = this.visData;
      id2forcePos = this.id2forcePos;
    }

    const searchNodesLevels = visData.map((levelData) => levelData.nodes);
    searchNodesLevels.forEach((levelData) =>
      levelData.forEach((node) => {
        node.forcePos = id2forcePos[node.id];
        node.x = node.forcePos[0];
        node.y = node.forcePos[1];
      })
    );

    const { layerPosLevels, transformFunc } = transformNodes({
      nodesLevels: searchNodesLevels,
      width: this.width,
      height: this.height,
      padding: this.padding,
    });

    this.searchTarget = {
      id: 'target',
      searchViewPosLevels: d3
        .range(visData.length)
        .map((i) => transformFunc(...targetOrigin, i)),
    };

    this.searchLayerPosLevels = layerPosLevels;
    searchNodesLevels.forEach((nodes, level) => {
      nodes.forEach((node) => {
        node.searchViewPosLevels = d3
          .range(level + 1)
          .map((i) => transformFunc(...node.forcePos, i));
        node.r = node.type * 2;
      });
    });

    this.searchNodesLevels = searchNodesLevels;

    const id2searchNode = {};
    searchNodesLevels.forEach((levelData) =>
      levelData.forEach((node) => (id2searchNode[node.id] = node))
    );

    const searchLinksLevels = parseVisRecords(searchRes).map((levelData) =>
      levelData.links.filter((link) => link.type !== HNSW_LINK_TYPE.None)
    );
    searchLinksLevels.forEach((levelData, level) =>
      levelData.forEach((link) => {
        const sourceId = link.source;
        const targetId = link.target;
        const sourceNode = id2searchNode[sourceId];
        const targetNode = id2searchNode[targetId];
        link.source = sourceNode;
        link.target = targetNode;
      })
    );
    this.searchLinksLevels = searchLinksLevels;
    // console.log('searchLinksLevels', this.searchLinksLevels);

    this.entryNodesLevels = visData.map((levelData) =>
      levelData.entryIds.map((id) => id2searchNode[id])
    );

    const { targetShowTime, nodeShowTime, linkShowTime, duration } =
      computeSearchViewTransition({
        linksLevels: this.searchLinksLevels,
        entryNodesLevels: this.entryNodesLevels,
        interLevelGap: this.searchInterLevelTime,
        intraLevelGap: this.searchIntraLevelTime,
      });
    this.searchTargetShowTime = targetShowTime;
    this.searchNodeShowTime = nodeShowTime;
    this.searchLinkShowTime = linkShowTime;
    this.searchTransitionDuration = duration;
  }
  renderSearchView({ ctx }) {
    this.renderBackground({ ctx });
    for (let level = 0; level < this.searchNodesLevels.length; level++) {
      this.renderSearchViewLevelLayer({ ctx, level });
      const nodes = this.searchNodesLevels[level];
      const links = this.searchLinksLevels[level];
      const entryNodes =
        level === this.entryNodesLevels.length - 1
          ? []
          : this.entryNodesLevels[level];
      this.renderSearchViewLinks({ ctx, links, level });
      // console.log(level, entryNodes);
      this.renderSearchViewInterLevelLinks({ ctx, entryNodes, level });
      this.renderSearchViewNodes({ ctx, nodes, level });

      level === this.selectedLevel &&
        this.selectedNode &&
        this.renderhighlightNodes({
          ctx,
          highlightNodes: [this.selectedNode],
          level,
          posAttr: 'searchViewPosLevels',
          color: colorScheme[6],
          _r: 2,
        });

      this._renderSearchViewTarget({ ctx, node: this.searchTarget, level });
    }
  }
  renderSearchViewTransition({ ctx, t = 999999999 }) {
    this.renderBackground({ ctx });
    for (let level = 0; level < this.searchNodesLevels.length; level++) {
      this.renderSearchViewLevelLayer({ ctx, level });
      const nodes = this.searchNodesLevels[level].filter(
        (node) =>
          this.searchNodeShowTime[getNodeIdWithLevel(node.id, level)] < t
      );
      const links = this.searchLinksLevels[level].filter(
        (link) =>
          this.searchLinkShowTime[
            getLinkIdWithLevel(link.source.id, link.target.id, level)
          ] +
            this.searchIntraLevelTime <
          t
      );
      const inProcessLinks = this.searchLinksLevels[level]
        .filter(
          (link) =>
            this.searchLinkShowTime[
              getLinkIdWithLevel(link.source.id, link.target.id, level)
            ] < t &&
            this.searchLinkShowTime[
              getLinkIdWithLevel(link.source.id, link.target.id, level)
            ] +
              this.searchIntraLevelTime >=
              t
        )
        .map((link) => ({
          t:
            (t -
              this.searchLinkShowTime[
                getLinkIdWithLevel(link.source.id, link.target.id, level)
              ]) /
            this.searchIntraLevelTime,
          link,
        }));
      const entryNodes =
        level === this.entryNodesLevels.length - 1
          ? []
          : this.entryNodesLevels[level].filter(
              (entryNode) =>
                this.searchLinkShowTime[
                  getEntryLinkIdWithLevel(entryNode.id, level)
                ] +
                  this.searchInterLevelTime <
                t
            );
      const inprocessEntryNodes =
        level === this.entryNodesLevels.length - 1
          ? []
          : this.entryNodesLevels[level]
              .filter(
                (entryNode) =>
                  this.searchLinkShowTime[
                    getEntryLinkIdWithLevel(entryNode.id, level)
                  ] < t &&
                  this.searchLinkShowTime[
                    getEntryLinkIdWithLevel(entryNode.id, level)
                  ] +
                    this.searchInterLevelTime >=
                    t
              )
              .map((node) => ({
                node,
                t:
                  (t -
                    this.searchLinkShowTime[
                      getEntryLinkIdWithLevel(node.id, level)
                    ]) /
                  this.searchInterLevelTime,
              }));
      const searchTarget = this.searchTarget;
      this.renderSearchViewLinks({ ctx, links, inProcessLinks, level });
      // console.log(level, entryNodes);
      this.renderSearchViewInterLevelLinks({
        ctx,
        entryNodes,
        inprocessEntryNodes,
        searchTarget,
        level,
      });
      this.renderSearchViewNodes({ ctx, nodes, level });

      this.searchTargetShowTime[level] < t &&
        this._renderSearchViewTarget({ ctx, node: this.searchTarget, level });

      if (!!this.hoveredNode) {
        const [x, y] = this.hoveredNode.searchViewPosLevels[this.hoveredLevel];
        const originX =
          (this.width - this.padding[1] - this.padding[3]) / 2 +
          this.padding[3];
        const isLeft = originX > x;

        this.renderHoveredPanelLine({ ctx, x, y, isLeft });
      } else {
        this._renderHoveredPanel([], ZYellow);
      }
    }
  }
  renderSearchViewNodes({ ctx, nodes, level, shadowBlur = 4 }) {
    let _nodes = [];

    // coarse
    _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Coarse);
    drawEllipse({
      ctx,
      circles: _nodes.map((node) => [...node.searchViewPosLevels[level], 6, 4]),
      hasFill: true,
      fillStyle: hexWithOpacity(ZBlue, 0.5),
      shadowColor: ZBlue,
      shadowBlur,
    });

    // candidate
    _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Candidate);
    drawEllipse({
      ctx,
      circles: _nodes.map((node) => [...node.searchViewPosLevels[level], 8, 5]),
      hasFill: true,
      fillStyle: hexWithOpacity(ZYellow, 0.8),
      shadowColor: ZYellow,
      shadowBlur,
    });

    // fine
    _nodes = nodes.filter((node) => node.type === HNSW_NODE_TYPE.Fine);
    drawEllipse({
      ctx,
      circles: _nodes.map((node) => [
        ...node.searchViewPosLevels[level],
        10,
        7,
      ]),
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[2], 1),
      hasStroke: true,
      lineWidth: 1,
      strokeStyle: hexWithOpacity(ZOrange, 0.8),
      shadowColor: ZOrange,
      shadowBlur,
    });
  }
  renderSearchViewInterLevelLinks({
    ctx,
    entryNodes,
    inprocessEntryNodes,
    searchTarget,
    level,
  }) {
    const pointsList = entryNodes.map((node) =>
      shortenLine(
        node.searchViewPosLevels[level + 1],
        node.searchViewPosLevels[level],
        16
      )
    );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
    const targetPointsList =
      pointsList.length === 0
        ? []
        : [
            shortenLine(
              searchTarget.searchViewPosLevels[level + 1],
              searchTarget.searchViewPosLevels[level],
              16
            ),
          ];
    drawLinesWithLinearGradient({
      ctx,
      pointsList: targetPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: targetLevelGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });

    const inprocessPointsList = inprocessEntryNodes.map(({ node, t }) =>
      shortenLine(
        node.searchViewPosLevels[level + 1],
        getInprocessPos(
          node.searchViewPosLevels[level + 1],
          node.searchViewPosLevels[level],
          t
        ),
        16
      )
    );
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
    const inprocessTargetPointsList =
      inprocessPointsList.length === 0
        ? []
        : [
            shortenLine(
              searchTarget.searchViewPosLevels[level + 1],
              getInprocessPos(
                searchTarget.searchViewPosLevels[level + 1],
                searchTarget.searchViewPosLevels[level],
                inprocessEntryNodes[0].t
              ),
              16
            ),
          ];
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessTargetPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: targetLevelGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
  }
  renderSearchViewLinks({ ctx, links, inProcessLinks, level }) {
    let pointsList = [];
    let inprocessPointsList = [];
    const shortenLineD = 18;

    // Visited
    pointsList = links
      .filter((link) => link.type === HNSW_LINK_TYPE.Visited)
      .map((link) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: normalGradientStopColors,
      lineWidth: 4,
      lineCap: 'round',
    });
    inprocessPointsList = inProcessLinks
      .filter(({ link }) => link.type === HNSW_LINK_TYPE.Visited)
      .map(({ t, link }) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          getInprocessPos(
            link.source.searchViewPosLevels[level],
            link.target.searchViewPosLevels[level],
            t
          ),
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: normalGradientStopColors,
      lineWidth: 4,
      lineCap: 'round',
    });

    // Extended
    pointsList = links
      .filter((link) => link.type === HNSW_LINK_TYPE.Extended)
      .map((link) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: normalGradientStopColors,
      lineWidth: 4,
      lineCap: 'round',
    });
    inprocessPointsList = inProcessLinks
      .filter(({ link }) => link.type === HNSW_LINK_TYPE.Extended)
      .map(({ t, link }) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          getInprocessPos(
            link.source.searchViewPosLevels[level],
            link.target.searchViewPosLevels[level],
            t
          ),
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: normalGradientStopColors,
      lineWidth: 4,
      lineCap: 'round',
    });

    // Searched
    pointsList = links
      .filter((link) => link.type === HNSW_LINK_TYPE.Searched)
      .map((link) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
    inprocessPointsList = inProcessLinks
      .filter(({ link }) => link.type === HNSW_LINK_TYPE.Searched)
      .map(({ t, link }) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          getInprocessPos(
            link.source.searchViewPosLevels[level],
            link.target.searchViewPosLevels[level],
            t
          ),
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });

    // Fine
    pointsList = links
      .filter((link) => link.type === HNSW_LINK_TYPE.Fine)
      .map((link) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          link.target.searchViewPosLevels[level],
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
    inprocessPointsList = inProcessLinks
      .filter(({ link }) => link.type === HNSW_LINK_TYPE.Fine)
      .map(({ t, link }) =>
        shortenLine(
          link.source.searchViewPosLevels[level],
          getInprocessPos(
            link.source.searchViewPosLevels[level],
            link.target.searchViewPosLevels[level],
            t
          ),
          shortenLineD
        )
      );
    drawLinesWithLinearGradient({
      ctx,
      pointsList: inprocessPointsList,
      hasStroke: true,
      isStrokeLinearGradient: true,
      gradientStopColors: highLightGradientStopColors,
      lineWidth: 6,
      lineCap: 'round',
    });
  }
  _renderSearchViewTarget({ ctx, node, level }) {
    drawEllipse({
      ctx,
      circles: [[...node.searchViewPosLevels[level], 10, 7]],
      hasFill: true,
      fillStyle: hexWithOpacity(whiteColor, 1),
      shadowColor: whiteColor,
      shadowBlur: 6,
    });
  }
}
