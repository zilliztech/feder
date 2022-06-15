import renderBackground from './renderBackground';
import animateNodesTrans from './animateNodesTrans';
import * as d3 from 'd3';

export default function animateFine2Fine({
  oldSearchViewType,
  newSearchViewType,
  infoPanel,
}) {
  const timer = d3.timer((elapsed) => {
    renderBackground(this);
    animateNodesTrans({
      ...this,
      elapsed,
      duration: this.fineSearchNodeTransTime,
      delay: 0,
      newSearchViewType,
    });

    if (elapsed >= this.fineSearchNodeTransTime) {
      console.log(`${oldSearchViewType} To ${newSearchViewType} OK!`);
      timer.stop();
      this.renderFineSearch(infoPanel, newSearchViewType);
    }
  });
}
