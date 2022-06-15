import renderBackground from './renderBackground';
import animateNodesTrans from './animateNodesTrans';
import * as d3 from 'd3';

export default function animateFine2Fine(
  oldSearchViewType,
  newSearchViewType,
  ctx,
  searchViewLayoutData,
  federView,
  endCallback
) {
  const { fineSearchNodeTransTime } = federView;
  const timer = d3.timer((elapsed) => {
    renderBackground(ctx, federView);
    animateNodesTrans({
      ctx,
      searchViewLayoutData,
      federView,
      elapsed,
      duration: fineSearchNodeTransTime,
      delay: 0,
      newSearchViewType,
    });

    if (elapsed >= fineSearchNodeTransTime) {
      console.log(`${oldSearchViewType} To ${newSearchViewType} OK!`);
      timer.stop();
      endCallback();
    }
  });
}
