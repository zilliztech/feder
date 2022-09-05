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
export interface TInfoPanelContext {
  title?: string;
  text?: string;
  option?: TInfoPanelOption;
  image?: string;
  images?: string[];
  tipLine?: number;
  node: HTMLElement;
}

export default class InfoPanel {
  div: HTMLDivElement;
  constructor(styles: TInfoPanelStyles = {}, viewParams: TViewParams = {}) {
    const divD3 = d3.create('div');
    this.div = divD3.node();
    Object.assign(
      divD3.style,
      Object.assign({}, defaultTInfoPanelStyles, styles)
    );
  }
  static initClass() {
    const styleCss = document.createElement('style');
    styleCss.innerHTML = cssDefinition;
    document.getElementsByTagName('head').item(0).appendChild(styleCss);
  }
  setContext(context: TInfoPanelContext[], isFlex = false) {
    const container = d3.select(this.div);
    container.selectAll('*').remove();
  }
  setPosition(pos: TCoord = null) {}
}
