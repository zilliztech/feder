import { TViewParams } from 'Types';
import { TVisData } from 'Types/visData';
import TViewHandler from '../types';

import InfoPanel from 'FederView/InfoPanel';

export default class HnswSearchView implements TViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  constructor(visData: TVisData, viewParams: TViewParams) {
    this.staticPanel = new InfoPanel();
    this.clickedPanel = new InfoPanel();
    this.hoveredPanel = new InfoPanel();

    this.init(visData, viewParams);
  }
  init(visData: TVisData, viewParams: TViewParams) {}
  render() {}
}