import * as d3 from 'd3';
import { canvasScale } from './config.js';
import {
  ZYellow,
  ZBlue,
  whiteColor,
  blackColor,
  hexWithOpacity,
} from './render.js';

export const overviewPanelId = 'feder-info-overview-panel';
export const selectedPanelId = 'feder-info-selected-panel';
export const hoveredPanelId = 'feder-info-hovered-panel';

const panelBackgroundColor = hexWithOpacity(blackColor, 0.6);
export default class BaseView {
  constructor({ width = 600, height = 380, padding = [0, 0, 0, 0], getVectorById } = {}) {
    this.width = width * canvasScale;
    this.height = height * canvasScale;
    this.padding = padding.map((num) => num * canvasScale);
    this.getVectorById = getVectorById;
  }
  setDom(dom) {
    if (dom !== this.dom) {
      this.dom = dom;
      this.initCanvas();
    }
  }
  initCanvas() {
    const dom = this.dom;
    // dom.style.display = 'flex';
    dom.innerHTML = '';
    const width = this.width / canvasScale;
    const height = this.height / canvasScale;
    const domStyle = {
      position: 'relative',
      width: `${width}px`,
    };
    Object.assign(dom.style, domStyle);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'feder-canvas');
    canvas.width = width;
    canvas.height = height;
    dom.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.scale(1 / canvasScale, 1 / canvasScale);
    this.canvas = canvas;

    const overviewPanel = document.createElement('div');
    overviewPanel.setAttribute('id', overviewPanelId);
    overviewPanel.className =
      overviewPanel.className + ' panel-border panel hide';
    const overviewPanelStyle = {
      position: 'absolute',
      // left: `${canvas.width - 10}px`,
      left: '30px',
      top: '24px',
      width: '350px',
      // height: '250px',
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
      right: '30px',
      top: '24px',
      'max-width': '230px',
      // height: '400px',
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
      // height: '500px',
      // borderStyle: 'dashed',
      // borderColor: ZYellow,
      // borderWidth: '1px',
      // backgroundColor: panelBackgroundColor,
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
        padding: 18px 26px;
        point-events: none;
        font-size: 14px;
      }
      .hide {
        opacity: 0;
      }
      .panel-item {
        margin-bottom: 10px;
      }
      .panel-img {
        width: 200px;
        height: 150px;
        background-size: cover;
        margin-bottom: 15px;
        border-radius: 4px;
        border: 1px solid ${ZYellow};
      }
      .panel-item-display-flex {
        display: flex;
      }
      .panel-item-title {
        font-weight: 600;
      }
      .panel-item-text {
        margin-top: 3px;
        font-weight: 400;
        font-size: 12px;
        word-break: break-all;
      }
      .panel-item-text-flex {
        margin-left: 10px;
      }
      .panel-item-text-margin {
        margin: 0 10px;
      }
      .text-no-wrap {
        white-space: nowrap;
      }
    `;
    document.getElementsByTagName('head').item(0).appendChild(style);
  }
  _mouseListener() {
    const canvas = this.canvas;
    canvas.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      // console.log('mouse', x, y);
      this.mouseMoveHandler && this.mouseMoveHandler({ x, y });
    });
    canvas.addEventListener('click', (e) => {
      const { offsetX, offsetY } = e;
      const x = offsetX * canvasScale;
      const y = offsetY * canvasScale;
      // console.log('click', x, y);
      this.mouseClickHandler && this.mouseClickHandler({ x, y });
    });
    canvas.addEventListener('mouseleave', () => {
      this.mouse = null;
      // console.log('mouseleave');
      this.mouseLeaveHandler && this.mouseLeaveHandler();
    });
  }
  _renderSelectedPanel(itemList = [], color) {
    const panel = d3.select(`#${selectedPanelId}`);
    panel.style('color', color);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      this._renderPanel(panel, itemList);
    }
  }
  _renderHoveredPanel(itemList = [], color, x = 0, y = 0, isLeft = false) {
    const panel = d3.select(`#${hoveredPanelId}`);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      panel.style('color', color);
      // panel.style.left = x + 'px';
      // panel.style.top = y + 'px';
      if (isLeft) {
        panel.style('left', null);
        panel.style('right', (this.width - x) / canvasScale + 'px');
        panel.style('flex-direction', 'row-reverse');
      } else {
        panel.style('left', x / canvasScale + 'px');
        panel.style('flex-direction', 'row');
      }

      panel.style('transform', `translateY(-6px)`);

      panel.style('top', y / canvasScale + 'px');
      this._renderPanel(panel, itemList);
    }
  }
  _renderOverviewPanel(itemList, color) {
    const panel = d3.select(`#${overviewPanelId}`);
    panel.style('color', color);
    if (itemList.length === 0) panel.classed('hide', true);
    else {
      this._renderPanel(panel, itemList);
    }
  }
  _renderPanel(panel, itemList) {
    panel.classed('hide', false);
    panel.selectAll('*').remove();

    itemList.forEach((item) => {
      const div = panel.append('div');
      div.classed('panel-item', true);
      item.isFlex && div.classed('panel-item-display-flex', true);
      if (item.isImg) {
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
}
