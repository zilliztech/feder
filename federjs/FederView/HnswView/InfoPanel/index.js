import * as d3 from 'd3';

import {
  ZYellow,
  ZBlue,
  whiteColor,
  blackColor,
  drawPath,
  hexWithOpacity,
} from 'Utils/renderUtils';

import { showVectors } from 'Utils';
import { HNSW_NODE_TYPE } from 'Types';

export const overviewPanelId = 'feder-info-overview-panel';
export const selectedPanelId = 'feder-info-selected-panel';
export const hoveredPanelId = 'feder-info-hovered-panel';

const panelBackgroundColor = hexWithOpacity(blackColor, 0.6);

export default class InfoPanel {
  constructor({ dom, width, height }) {
    this.dom = dom;
    this.width = width;
    this.height = height;

    const overviewPanel = document.createElement('div');
    overviewPanel.setAttribute('id', overviewPanelId);
    overviewPanel.className =
      overviewPanel.className + ' panel-border panel hide';
    const overviewPanelStyle = {
      position: 'absolute',
      // left: `${canvas.width - 10}px`,
      left: '16px',
      top: '10px',
      width: '280px',
      'max-height': `${height - 20}px`,
      overflow: 'auto',
      borderColor: whiteColor,
      backgroundColor: panelBackgroundColor,
    };
    Object.assign(overviewPanel.style, overviewPanelStyle);
    dom.appendChild(overviewPanel);

    const selectedPanel = document.createElement('div');
    selectedPanel.setAttribute('id', selectedPanelId);
    selectedPanel.className =
      selectedPanel.className + ' panel-border panel hide';
    const selectedPanelStyle = {
      position: 'absolute',
      // left: `${canvas.width - 10}px`,
      right: '16px',
      top: '10px',
      'max-width': '180px',
      'max-height': `${height - 20}px`,
      overflow: 'auto',
      borderColor: ZYellow,
      backgroundColor: panelBackgroundColor,
    };
    Object.assign(selectedPanel.style, selectedPanelStyle);
    dom.appendChild(selectedPanel);

    const hoveredPanel = document.createElement('div');
    hoveredPanel.setAttribute('id', hoveredPanelId);
    hoveredPanel.className = hoveredPanel.className + ' hide';
    const hoveredPanelStyle = {
      position: 'absolute',
      left: 0,
      // right: '30px',
      top: 0,
      width: '240px',
      display: 'flex',
      pointerEvents: 'none',
    };
    Object.assign(hoveredPanel.style, hoveredPanelStyle);
    dom.appendChild(hoveredPanel);

    this.initStyle();
  }

  initStyle() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    .panel-border {
      border-style: dashed;
      border-width: 1px;
    }
    .panel {
      padding: 6px 8px;
      font-size: 12px;
    }
    .hide {
      opacity: 0;
    }
    .panel-item {
      margin-bottom: 6px;
    }
    .panel-img {
      width: 150px;
      height: 100px;
      background-size: cover;
      margin-bottom: 12px;
      border-radius: 4px;
      border: 1px solid ${ZYellow};
    }
    .panel-item-display-flex {
      display: flex;
    }
    .panel-item-title {
      font-weight: 600;
      margin-bottom: 3px;
    }
    .panel-item-text {
      font-weight: 400;
      font-size: 10px;
      word-break: break-all;
    }
    .panel-item-text-flex {
      margin-left: 8px;
    }
    .panel-item-text-margin {
      margin: 0 6px;
    }
    .text-no-wrap {
      white-space: nowrap;
    }
  `;
    document.getElementsByTagName('head').item(0).appendChild(style);
  }

  renderSelectedPanel(itemList = [], color = '#000') {
    const panel = d3.select(this.dom).select(`#${selectedPanelId}`);
    panel.style('color', color);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      this.renderPanel(panel, itemList);
    }
  }
  renderHoveredPanel({
    itemList = [],
    canvasScale = 1,
    color = '#000',
    x = 0,
    y = 0,
    isLeft = false,
  } = {}) {
    const panel = d3.select(this.dom).select(`#${hoveredPanelId}`);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      panel.style('color', color);
      // panel.style.left = x + 'px';
      // panel.style.top = y + 'px';
      if (isLeft) {
        panel.style('left', null);
        panel.style('right', this.width - x / canvasScale + 'px');
        panel.style('flex-direction', 'row-reverse');
      } else {
        panel.style('left', x / canvasScale + 'px');
        panel.style('flex-direction', 'row');
      }

      panel.style('transform', `translateY(-6px)`);

      panel.style('top', y / canvasScale + 'px');
      this.renderPanel(panel, itemList);
    }
  }
  renderOverviewPanel(itemList = [], color) {
    const panel = d3.select(this.dom).select(`#${overviewPanelId}`);
    panel.style('color', color);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      this.renderPanel(panel, itemList);
    }
  }
  renderPanel(panel, itemList) {
    panel.classed('hide', false);
    panel.selectAll('*').remove();

    itemList.forEach((item) => {
      const div = panel.append('div');
      div.classed('panel-item', true);
      item.isFlex && div.classed('panel-item-display-flex', true);
      if (item.isImg && item.imgUrl) {
        div.classed('panel-img', true);
        div.style('background-image', `url(${item.imgUrl})`);
      }
      if (item.title) {
        const title = div.append('div');
        title.classed('panel-item-title', true);
        title.text(item.title);
      }
      if (item.text) {
        const title = div.append('div');
        title.classed('panel-item-text', true);
        item.isFlex && title.classed('panel-item-text-flex', true);
        item.textWithMargin && title.classed('panel-item-text-margin', true);
        item.noWrap && title.classed('text-no-wrap', true);
        title.text(item.text);
      }
    });
  }

  updateOverviewOverviewInfo({ indexMeta, nodesCount, linksCount }) {
    const overviewInfo = [
      {
        title: 'HNSW',
      },
      {
        title: `M = ${indexMeta.M}, ef_construction = ${indexMeta.ef_construction}`,
      },
      {
        title: `${indexMeta.ntotal} vectors, including ${indexMeta.levelCount} levels (only show the top 3 levels).`,
      },
    ];
    for (let level = indexMeta.overviewLevelCount - 1; level >= 0; level--) {
      overviewInfo.push({
        isFlex: true,
        title: `Level ${
          level + indexMeta.levelCount - indexMeta.overviewLevelCount
        }`,
        text: `${nodesCount[level]} vectors, ${linksCount[level]} links`,
      });
    }
    this.renderOverviewPanel(overviewInfo, whiteColor);
  }
  updateOverviewClickedInfo(
    node,
    level,
    { indexMeta, mediaType, mediaCallback, getVectorById }
  ) {
    const itemList = [];
    if (node) {
      itemList.push({
        title: `Level ${
          level + indexMeta.levelCount - indexMeta.overviewLevelCount
        }`,
      });
      itemList.push({
        title: `Row No. ${node.id}`,
      });
      mediaType === 'img' &&
        itemList.push({
          isImg: true,
          imgUrl: mediaCallback(node.id),
        });
      itemList.push({
        title: `Shortest path from the entry:`,
        text: `${[...node.path, node.id].join(' => ')}`,
      });
      itemList.push({
        title: `Linked vectors:`,
        text: `${node.linksLevels[level].join(', ')}`,
      });
      itemList.push({
        title: `Vectors:`,
        text: `${showVectors(getVectorById(node.id))}`,
      });
    }
    this.renderSelectedPanel(itemList, ZYellow);
  }
  updateOverviewHoveredInfo(
    hoveredNode,
    { isLeft, endX, endY },
    { mediaType, mediaCallback, canvasScale }
  ) {
    if (!!hoveredNode) {
      const itemList = [];
      itemList.push({
        text: `No. ${hoveredNode.id}`,
        textWithMargin: true,
        noWrap: true,
      });
      mediaType === 'img' &&
        itemList.push({
          isImg: true,
          imgUrl: mediaCallback(hoveredNode.id),
        });

      this.renderHoveredPanel({
        itemList,
        color: ZYellow,
        x: endX,
        y: endY,
        isLeft,
        canvasScale,
      });
    } else {
      this.renderHoveredPanel();
    }
  }

  updateSearchViewOverviewInfo(
    {
      targetMediaUrl,
      id2forcePos,
      searchNodesLevels,
      searchLinksLevels,
      searchParams,
    },
    { indexMeta }
  ) {
    const overviewInfo = [
      {
        title: 'HNSW - Search',
      },
      {
        isImg: true,
        imgUrl: targetMediaUrl,
      },
      {
        title: `M = ${indexMeta.M}, ef_construction = ${indexMeta.ef_construction}.`,
      },
      {
        title: `k = ${searchParams.k}, ef_search = ${searchParams.ef}.`,
      },
      {
        title: `${indexMeta.ntotal} vectors, including ${indexMeta.levelCount} levels.`,
      },
      {
        title: `During the search, a total of ${
          Object.keys(id2forcePos).length - 1
        } of these vectors were visited.`,
      },
    ];
    for (let level = indexMeta.levelCount - 1; level >= 0; level--) {
      const nodes = searchNodesLevels[level];
      const links = searchLinksLevels[level];
      const minDist =
        level > 0
          ? nodes
              .find((node) => node.type === HNSW_NODE_TYPE.Fine)
              .dist.toFixed(3)
          : d3.min(
              nodes.filter((node) => node.type === HNSW_NODE_TYPE.Fine),
              (node) => node.dist.toFixed(3)
            );
      overviewInfo.push({
        isFlex: true,
        title: `Level ${level}`,
        text: `${nodes.length} vectors, ${links.length} links, min-dist: ${minDist}`,
      });
    }
    this.renderOverviewPanel(overviewInfo, whiteColor);
  }
  updateSearchViewHoveredInfo(
    { hoveredNode, hoveredLevel },
    {
      mediaType,
      mediaCallback,
      width,
      padding,

      HoveredPanelLine_1_x,
      HoveredPanelLine_1_y,
      HoveredPanelLine_2_x,
      canvasScale,
    }
  ) {
    if (!hoveredNode) {
      this.renderHoveredPanel();
    } else {
      const [x, y] = hoveredNode.searchViewPosLevels[hoveredLevel];
      const originX = (width - padding[1] - padding[3]) / 2 + padding[3];
      const isLeft = originX > x;
      const k = isLeft ? -1 : 1;
      const endX =
        x +
        HoveredPanelLine_1_x * canvasScale * k +
        HoveredPanelLine_2_x * canvasScale * k;
      const endY = y + HoveredPanelLine_1_y * canvasScale * k;

      const itemList = [];
      itemList.push({
        text: `No. ${hoveredNode.id}`,
        textWithMargin: true,
        noWrap: true,
      });
      mediaType === 'img' &&
        itemList.push({
          isImg: true,
          imgUrl: mediaCallback(hoveredNode.id),
        });

      this.renderHoveredPanel({
        itemList,
        color: ZYellow,
        x: endX,
        y: endY,
        isLeft,
        canvasScale,
      });
    }
  }
  updateSearchViewClickedInfo(
    { clickedNode, clickedLevel },
    { mediaType, mediaCallback, getVectorById }
  ) {
    const itemList = [];
    if (!clickedNode) {
      this.renderSelectedPanel([], ZYellow);
    } else {
      itemList.push({
        title: `Level ${clickedLevel}`,
      });
      itemList.push({
        title: `Row No. ${clickedNode.id}`,
      });
      itemList.push({
        title: `Distance to the target: ${clickedNode.dist.toFixed(3)}`,
      });
      mediaType === 'img' &&
        itemList.push({
          isImg: true,
          imgUrl: mediaCallback(clickedNode.id),
        });
      itemList.push({
        title: `Vector:`,
        text: `${showVectors(getVectorById(clickedNode.id))}`,
      });
    }
    this.renderSelectedPanel(itemList, ZYellow);
  }
}
