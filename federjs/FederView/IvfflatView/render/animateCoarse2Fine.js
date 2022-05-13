import * as d3 from 'd3';
import renderBackground from './renderBackground';
import animateNonNprobeClusters from './animateNonNprobeClusters';
import animateNprobeClustersTrans from './animateNprobeClustersTrans';
import animateTargetNode from './animateTargetNode';
import animateNprobeClustersOpacity from './animateNprobeClustersOpacity';
import animateNodesOpacityAndTrans from './animateNodesOpacityAndTrans';
import { ANIMATION_TYPE, SEARCH_VIEW_TYPE } from 'Types';

export default function animateCoarse2Fine({
  oldSearchViewType,
  newSearchViewType,
}) {
  const stepAllTime = this.animateExitTime + this.animateEnterTime;
  const timer = d3.timer((elapsed) => {
    renderBackground(this);

    animateNonNprobeClusters({
      ...this,
      elapsed,
      delay: 0,
      duration: this.animateExitTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateNprobeClustersTrans({
      ...this,
      elapsed,
      delay: 0,
      duration: this.animateExitTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateTargetNode({
      ...this,
      elapsed,
      delay: 0,
      duration: this.animateExitTime,
      animationType: ANIMATION_TYPE.exit,
      newSearchViewType,
    });

    animateNprobeClustersOpacity({
      ...this,
      elapsed,
      delay: this.animateExitTime,
      duration: this.animateEnterTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateNodesOpacityAndTrans({
      ...this,
      elapsed,
      delay: this.animateExitTime,
      duration: this.animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
      oldSearchViewType,
      newSearchViewType,
    });

    if (elapsed >= stepAllTime) {
      console.log('Coarse => Fine [OK]');
      timer.stop();
      this.searchViewType = newSearchViewType;
      this.renderFineSearch(newSearchViewType);
    }
  });
}
