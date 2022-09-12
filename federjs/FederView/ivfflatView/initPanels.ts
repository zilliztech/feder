import InfoPanel from 'FederView/InfoPanel';
import {
  clickedPanelStyles,
  hoveredPanelStyles,
  staticPanelStyles,
} from './infoPanelStyles';
import IvfflatOverview from './IvfflatOverview';
import IvfflatSearchView from './IvfflatSearchView';

export default function initPanels(this: IvfflatOverview | IvfflatSearchView) {
  InfoPanel.initClass();
  this.staticPanel = new InfoPanel(
    this.node,
    staticPanelStyles(this.viewParams)
  );
  this.clickedPanel = new InfoPanel(
    this.node,
    clickedPanelStyles(this.viewParams)
  );
  this.hoveredPanel = new InfoPanel(
    this.node,
    hoveredPanelStyles(this.viewParams)
  );
}
