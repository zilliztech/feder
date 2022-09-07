import * as d3 from 'd3';
import { TCoord, TViewParams } from 'Types';
import {
  cssDefinition,
  defaultTInfoPanelStyles,
} from './defaultTInfoPanelStyles';

export interface TInfoPanelStyles {}

export interface TInfoPanelOption {
  isActive: boolean;
  text: string;
  callback: Function;
}
export interface TInfoPanelContentItem {
  title?: string;
  text?: string;
  option?: TInfoPanelOption;
  image?: string;
  images?: string[];
}

export interface TInfoPanelContent {
  flex?: boolean;
  flexDirection?: string;
  hasBorder?: boolean;
  themeColor?: string;
  fontSize?: number;
  content: TInfoPanelContentItem[];
}

export interface TDivPosStyle {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export default class InfoPanel {
  container: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  constructor(node: HTMLElement, styles: TInfoPanelStyles = {}) {
    const divD3 = d3.select(node).append('div');
    this.container = divD3;
    Object.assign(
      divD3.node().style,
      Object.assign({}, defaultTInfoPanelStyles, styles)
    );
  }
  static initClass() {
    const styleCss = document.createElement('style');
    styleCss.innerHTML = cssDefinition;
    document.getElementsByTagName('head').item(0).appendChild(styleCss);
  }
  setContent(content: TInfoPanelContent) {
    const container = this.container;
    container.selectAll('*').remove();

    const { themeColor = '#FFFFFF', fontSize = '10px' } = content;
    container.style('font-size', fontSize);
    container.style('color', themeColor);

    if (content.content.length === 0) {
      container.classed('hide', true);
      return;
    }
    container.classed('hide', false);

    if (content.flex) {
      container.style('display', 'flex');
      content.flexDirection &&
        container.style('flex-direction', content.flexDirection);
    }
    if (content.hasBorder) {
      container.classed('panel-border', true);
      container.classed('panel-padding', true);
      container.style('border-color', themeColor);
    }
    content.content.forEach((item) => {
      const div = container.append('div');
      div.classed('panel-item', true);

      if (item.title || item.text) {
        const span = div.append('span');
        span.classed('panel-span', true);

        if (item.title) {
          const title = span.append('text');
          title.classed('panel-item-title', true);
          title.text(item.title);
        }
        if (item.text) {
          const text = span.append('text');
          text.classed('panel-item-text', true);
          text.text(item.text);
        }
      } else if (item.image) {
        div.classed('panel-img', true);
        div.style('background-image', `url(${item.image})`);
        div.style('border', `1px solid ${themeColor}`);
      } else if (item.images) {
        div.classed('panel-img-gallery', true);
        item.images.forEach((url) => {
          const imgDiv = div.append('div');
          imgDiv.classed('panel-img-gallery-item', true);
          imgDiv.style('background-image', `url(${url})`);
        });
      } else if (item.option) {
        div.classed('panel-item-option', true);

        const optionIcon = div.append('div');
        optionIcon.classed('panel-item-option-icon', true);
        optionIcon.classed(
          'panel-item-option-icon-active',
          !!item.option.isActive
        );

        const optionLabel = div.append('div');
        optionLabel.classed('panel-item-option-label', true);
        optionLabel.text(item.option.text);

        item.option.callback && div.on('click', () => item.option.callback());
      }
    });
  }
  setPosition(posStyle: TDivPosStyle) {
    const container = this.container;
    Object.assign(container.node().style, posStyle);
  }
}
