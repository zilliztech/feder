import * as d3 from 'd3';
import renderBackground from './renderBackground';
import animateNonNprobeClusters from './animateNonNprobeClusters';
import animateNprobeClustersTrans from './animateNprobeClustersTrans';
import animateTargetNode from './animateTargetNode';
import animateNprobeClustersOpacity from './animateNprobeClustersOpacity';
import animateNodesOpacityAndTrans from './animateNodesOpacityAndTrans';
import { ANIMATION_TYPE } from 'Types';

export default function animateCoarse2Fine(
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

    animateNonNprobeClusters({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: 0,
      duration: animateExitTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateNprobeClustersTrans({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: 0,
      duration: animateExitTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateTargetNode({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: 0,
      duration: animateExitTime,
      animationType: ANIMATION_TYPE.exit,
      newSearchViewType,
    });

    animateNprobeClustersOpacity({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: animateExitTime,
      duration: animateEnterTime,
      animationType: ANIMATION_TYPE.exit,
    });

    animateNodesOpacityAndTrans({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      delay: animateExitTime,
      duration: animateEnterTime,
      animationType: ANIMATION_TYPE.enter,
      oldSearchViewType,
      newSearchViewType,
    });

    if (elapsed >= stepAllTime) {
      console.log('Coarse => Fine [OK]');
      timer.stop();
      endCallback();
    }
  });
}
