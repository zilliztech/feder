import { TCoord, TViewParams } from 'Types';

export interface TInfoPanelStyles {}

export interface TInfoPanelContext {}

export default class infoPanel {
  constructor(styles: TInfoPanelStyles = {}, viewParams: TViewParams = {}) {}
  init() {}
  setContext(context: TInfoPanelContext = null) {}
  setPosition(pos: TCoord = null) {}
}
