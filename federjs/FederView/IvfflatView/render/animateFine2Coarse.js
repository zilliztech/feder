import * as d3 from 'd3';
import renderBackground from './renderBackground';
import animateNonNprobeClusters from './animateNonNprobeClusters';
import animateNprobeClustersTrans from './animateNprobeClustersTrans';
import animateTargetNode from './animateTargetNode';
import animateNprobeClustersOpacity from './animateNprobeClustersOpacity';
import animateNodesOpacityAndTrans from './animateNodesOpacityAndTrans';
import { ANIMATION_TYPE, SEARCH_VIEW_TYPE } from 'Types';

export default function animateFine2Coarse({
  oldSearchViewType,
  newSearchViewType,
}) {
  const stepAllTime = this.animateExitTime + this.animateEnterTime;
  const timer = d3.timer((elapsed) => {
    renderBackground(this);

    animateNodesOpacityAndTrans({
      ...this,
      elapsed,
      delay: 0,
      duration: this.animateExitTime,
      animationType: ANIMATION_TYPE.exit,
      oldSearchViewType,
      newSearchViewType,
    });

    animateNprobeClustersOpacity({
      ...this,
      elapsed,
      delay: 0,
      duration: this.animateExitTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateNonNprobeClusters({
      ...this,
      elapsed,
      delay: this.animateExitTime,
      duration: this.animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateNprobeClustersTrans({
      ...this,
      elapsed,
      delay: this.animateExitTime,
      duration: this.animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateTargetNode({
      ...this,
      elapsed,
      delay: this.animateExitTime,
      duration: this.animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
      newSearchViewType,
    });

    if (elapsed >= stepAllTime) {
      console.log('Fine => Coarse [OK]');
      timer.stop();
      this.searchViewType = newSearchViewType;
      this.renderCoarseSearch();
    }
  });
}
