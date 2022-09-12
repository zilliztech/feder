import InfoPanel from 'FederView/InfoPanel';
import HnswOverview from '../hnswView/HnswOverview';
import HnswSearchView from '../hnswView/HnswSearchView';
import {
  clickedPanelStyles,
  hoveredPanelStyles,
  staticPanelStyles,
} from './infoPanelStyles';

export default function initPanels(this: HnswSearchView | HnswOverview) {
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
