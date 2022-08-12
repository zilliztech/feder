import * as d3 from 'd3';
import renderBackground from './renderBackground';
import animateNonNprobeClusters from './animateNonNprobeClusters';
import animateNprobeClustersTrans from './animateNprobeClustersTrans';
import animateTargetNode from './animateTargetNode';
import animateNprobeClustersOpacity from './animateNprobeClustersOpacity';
import animateNodesOpacityAndTrans from './animateNodesOpacityAndTrans';
import { ANIMATION_TYPE } from 'Types';

export default function animateFine2Coarse(
  oldSearchViewType,
  newSearchViewType,
  ctx,
  searchViewLayoutData,
  federView,
  endCallback = () => {}
) {
  const { animateExitTime, animateEnterTime } = federView;

  const stepAllTime = animateExitTime + animateEnterTime;
  const timer = d3.timer((elapsed) => {
    renderBackground(ctx, federView);

    animateNodesOpacityAndTrans({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: 0,
      duration: animateExitTime,
      animationType: ANIMATION_TYPE.exit,
      oldSearchViewType,
      newSearchViewType,
    });

    animateNprobeClustersOpacity({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: 0,
      duration: animateExitTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateNonNprobeClusters({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: animateExitTime,
      duration: animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateNprobeClustersTrans({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: animateExitTime,
      duration: animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
    });

    animateTargetNode({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: animateExitTime,
      duration: animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
      newSearchViewType,
    });

    if (elapsed >= stepAllTime) {
      console.log('Fine => Coarse [OK]');
      timer.stop();
      endCallback();
    }
  });
}
