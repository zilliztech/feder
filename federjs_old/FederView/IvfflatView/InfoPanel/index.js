import * as d3 from 'd3';

import {
  ZYellow,
  ZBlue,
  whiteColor,
  blackColor,
  drawPath,
  hexWithOpacity,
} from 'Utils/renderUtils';

import { showVectors, randomSelect } from 'Utils';

export const overviewPanelId = 'feder-info-overview-panel';
export const hoveredPanelId = 'feder-info-hovered-panel';

const panelBackgroundColor = hexWithOpacity(blackColor, 0.6);

export default class InfoPanel {
  constructor({ dom, width, height }) {
    this.dom = dom;
    this.width = width;
    this.height = height;

    this.initOverviewPanel();
    this.initHoveredPanel();
    this.initStyle();
  }
  initOverviewPanel() {
    const dom = this.dom;
    const overviewPanel = document.createElement('div');
    overviewPanel.setAttribute('id', overviewPanelId);
    overviewPanel.className =
      overviewPanel.className + ' panel-border panel hide';
    const overviewPanelStyle = {
      position: 'absolute',
      // left: `${canvas.width - 10}px`,
      left: '16px',
      top: '10px',
      width: '240px',
      'max-height': `${this.height - 40}px`,
      overflow: 'auto',
      borderColor: whiteColor,
      backgroundColor: panelBackgroundColor,
      // pointerEvents: 'none',
    };
    Object.assign(overviewPanel.style, overviewPanelStyle);
    dom.appendChild(overviewPanel);
    this.overviewPanel = overviewPanel;
  }
  setOverviewPanelPos(isPanelLeft) {
    const overviewPanel = this.overviewPanel;
    const overviewPanelStyle = isPanelLeft
      ? {
          left: '16px',
        }
      : {
          left: null,
          right: '16px',
        };
    Object.assign(overviewPanel.style, overviewPanelStyle);
  }

  updateOverviewOverviewInfo({ indexMeta }) {
    const { ntotal, nlist, listSizes } = indexMeta;
    const items = [
      {
        title: 'IVF_Flat',
      },
      {
        text: `${ntotal} vectors, divided into ${nlist} clusters.`,
      },
      {
        text: `The largest cluster has ${d3.max(
          listSizes
        )} vectors and the smallest cluster has only ${d3.min(
          listSizes
        )} vectors.`,
      },
    ];

    this.renderOverviewPanel(items, whiteColor);
  }

  updateSearchViewCoarseOverviewInfo(searchViewLayoutData, federView) {
    const {
      nprobe,
      clusters,
      targetMediaUrl,
      nprobeClusters,
      switchSearchViewHandlers,
    } = searchViewLayoutData;
    const { indexMeta } = federView;
    const { ntotal, nlist, listSizes } = indexMeta;
    const { switchVoronoi, switchPolar, switchProject } =
      switchSearchViewHandlers;
    const items = [
      {
        title: 'IVF_Flat - Search',
      },
      {
        isImg: true,
        imgUrl: targetMediaUrl,
      },
      {
        isOption: true,
        isActive: true,
        label: 'Coarse Search',
        callback: switchVoronoi,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Fine Search (Distance)',
        callback: switchPolar,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Fine Search (Project)',
        callback: switchProject,
      },
      {
        text: `${ntotal} vectors, divided into ${nlist} clusters.`,
      },
      {
        title: `Find the ${nprobe} (nprobe=${nprobe}) closest clusters.`,
      },
      ...nprobeClusters.map(({ clusterId }) => ({
        text: `cluster-${clusterId} (${
          listSizes[clusterId]
        } vectors) dist: ${clusters[clusterId].dis.toFixed(3)}.`,
      })),
    ];

    this.renderOverviewPanel(items, whiteColor);
  }

  updateSearchViewFinePolarOverviewInfo(searchViewLayoutData, federView) {
    const {
      k,
      nprobe,
      nodes,
      topKNodes,
      switchSearchViewHandlers,
      targetMediaUrl,
    } = searchViewLayoutData;
    const { switchVoronoi, switchPolar, switchProject } =
      switchSearchViewHandlers;
    const { mediaCallback } = federView;
    const fineAllVectorsCount = nodes.length;
    const showImages = topKNodes
      .map(({ id }) => mediaCallback(id))
      .filter((a) => a);
    const items = [
      {
        title: 'IVF_Flat - Search',
      },
      {
        isImg: true,
        imgUrl: targetMediaUrl,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Coarse Search',
        callback: switchVoronoi,
      },
      {
        isOption: true,
        isActive: true,
        label: 'Fine Search (Distance)',
        callback: switchPolar,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Fine Search (Project)',
        callback: switchProject,
      },
      {
        text: `Find the ${k} (k=${k}) vectors closest to the target from these ${nprobe} (nprobe=${nprobe}) clusters, ${fineAllVectorsCount} vectors in total.`,
      },
      {
        images: showImages,
      },
    ];

    this.renderOverviewPanel(items, whiteColor);
  }

  updateSearchViewFineProjectOverviewInfo(searchViewLayoutData, federView) {
    const {
      nprobe,
      nodes,
      topKNodes,
      targetMediaUrl,
      switchSearchViewHandlers,
    } = searchViewLayoutData;
    const { switchVoronoi, switchPolar, switchProject } =
      switchSearchViewHandlers;
    const { mediaCallback, viewParams } = federView;
    const fineAllVectorsCount = nodes.length;
    const showImages = topKNodes
      .map(({ id }) => mediaCallback(id))
      .filter((a) => a);
    const items = [
      {
        title: 'IVF_Flat - Search',
      },
      {
        isImg: true,
        imgUrl: targetMediaUrl,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Coarse Search',
        callback: switchVoronoi,
      },
      {
        isOption: true,
        isActive: false,
        label: 'Fine Search (Distance)',
        callback: switchPolar,
      },
      {
        isOption: true,
        isActive: true,
        label: 'Fine Search (Project)',
        callback: switchProject,
      },
      {
        text: `Projection of all ${fineAllVectorsCount} vectors in the ${nprobe} (nprobe=${nprobe}) clusters using ${
          viewParams.projectMethod || 'random'
        }.`,
      },
      {
        images: showImages,
      },
    ];

    this.renderOverviewPanel(items, whiteColor);
  }

  initHoveredPanel() {
    const dom = this.dom;
    const hoveredPanel = document.createElement('div');
    hoveredPanel.setAttribute('id', hoveredPanelId);
    hoveredPanel.className = hoveredPanel.className + 'panel-border panel hide';
    const hoveredPanelStyle = {
      position: 'absolute',
      left: 0,
      // right: '30px',
      top: 0,
      width: '200px',
      // display: 'flex',
      pointerEvents: 'none',
      backgroundColor: panelBackgroundColor,
    };
    Object.assign(hoveredPanel.style, hoveredPanelStyle);
    dom.appendChild(hoveredPanel);
  }

  updateOverviewHoveredInfo({
    hoveredCluster = null,
    listIds = [],
    images = [],
    x = 0,
    y = 0,
  } = {}) {
    const showImages = randomSelect(images, 9).filter((a) => a);
    // console.log('showImages', showImages);
    const items = hoveredCluster
      ? [
          {
            title: `cluster-${hoveredCluster.clusterId}`,
          },
          {
            text: `including ${listIds.length} vectors`,
          },
          {
            images: showImages,
          },
        ]
      : [];

    this.renderHoveredPanel(items, ZYellow, x, y);
  }

  updateSearchViewHoveredInfo({
    hoveredCluster = null,
    listIds = [],
    images = [],
    x = 0,
    y = 0,
  } = {}) {
    if (!hoveredCluster) {
      this.renderHoveredPanel();
    } else {
      const showImages = randomSelect(
        images.filter((a) => a),
        9
      );
      // console.log('showImages', showImages, images);
      const items = hoveredCluster
        ? [
            {
              title: `cluster-${hoveredCluster.clusterId}`,
            },
            {
              text: `including ${listIds.length} vectors`,
            },
            {
              text: `distance from center: ${hoveredCluster.dis.toFixed(3)}`,
            },
            {
              images: showImages,
            },
          ]
        : [];

      this.renderHoveredPanel(items, ZYellow, x, y);
    }
  }

  updateSearchViewHoveredNodeInfo({
    hoveredNode = null,
    img = '',
    x = 0,
    y = 0,
  } = {}) {
    if (!hoveredNode) {
      this.renderHoveredPanel();
    } else {
      const items = hoveredNode
        ? [
            {
              title: `Row No. ${hoveredNode.id}`,
            },
            {
              text: `belong to cluster-${hoveredNode.listId}`,
            },
            {
              text: `distance the target: ${hoveredNode.dis.toFixed(3)}`,
            },
            {
              isImg: true,
              imgUrl: img,
            },
          ]
        : [];

      this.renderHoveredPanel(items, ZYellow, x, y);
    }
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
    .panel-img-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 8px;
      grid-column-gap: 8px;
      // flex-wrap: wrap;
    }
    .panel-img-gallery-item {
      width: 100%;
      height: 44px;
      background-size: cover;
      border-radius: 2px;
      // border: 1px solid ${ZYellow};
    }
    .panel-item-option {
      display: flex;
      align-items: center;
      cursor: pointer;
      // pointer-events: auto;
    }
    .panel-item-option-icon {
      width: 6px;
      height: 6px;
      border-radius: 7px;
      border: 2px solid ${ZYellow};
      margin-left: 2px;
    }
    .panel-item-option-icon-active {
      background-color: ${ZYellow};
    }
    .panel-item-option-label {
      margin-left: 6px;
    }
  `;
    document.getElementsByTagName('head').item(0).appendChild(style);
  }
  renderHoveredPanel(itemList = [], color = '#000', x = 0, y = 0) {
    const panel = d3.select(this.dom).select(`#${hoveredPanelId}`);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      panel.style('color', color);
      // panel.style.left = x + 'px';
      // panel.style.top = y + 'px';
      const isLeft = x > this.width * 0.7;
      if (isLeft) {
        panel.style('left', null);
        panel.style('right', this.width - x - 10 + 'px');
      } else {
        panel.style('left', x + 10 + 'px');
        panel.style('right', null);
      }

      const isTop = y > this.height * 0.7;
      if (isTop) {
        panel.style('top', null);
        panel.style('bottom', this.height - y - 6 + 'px');
      } else {
        panel.style('top', y + 6 + 'px');
        panel.style('bottom', null);
      }

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
      if (item.images) {
        const imagesDiv = div.append('div');
        imagesDiv.classed('panel-img-gallery', true);
        item.images.forEach((url) => {
          const imgItem = imagesDiv.append('div');
          imgItem.classed('panel-img-gallery-item', true);
          imgItem.style('background-image', `url(${url})`);
        });
      }
      if (item.isOption) {
        const optionDiv = div.append('div');
        optionDiv.classed('panel-item-option', true);
        const optionIcon = optionDiv.append('div');
        optionIcon.classed('panel-item-option-icon', true);
        if (item.isActive)
          optionIcon.classed('panel-item-option-icon-active', true);
        else optionIcon.classed('panel-item-option-icon-active', false);

        const optionLabel = optionDiv.append('div');
        optionLabel.classed('panel-item-option-label', true);
        optionLabel.text(item.label);

        item.callback && optionDiv.on('click', item.callback);
      }
    });
  }
}
