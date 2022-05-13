import { getDisFunc } from 'Utils';
import { MetricType } from 'Types';
import searchLevelO from './searchLevel0';

const hnswlibHNSWSearch = ({ index, target, params = {} }) => {
  const { ef = 10, k = 8, metricType = MetricType.METRIC_L2 } = params;
  const disfunc = getDisFunc(metricType);

  let topkResults = [];
  const vis_records_all = [];

  const {
    enterPoint,
    vectors,
    maxLevel,
    linkLists_levels,
    linkLists_level_0,
    numDeleted,
    labels,
  } = index;

  let curNodeId = enterPoint;
  let curDist = disfunc(vectors[curNodeId], target);

  for (let level = maxLevel; level > 0; level--) {
    const vis_records = [];
    vis_records.push([labels[curNodeId], labels[curNodeId], curDist]);
    let changed = true;
    while (changed) {
      changed = false;

      const curlinks = linkLists_levels[curNodeId][level - 1];

      curlinks.forEach((candidateId) => {
        const dist = disfunc(vectors[candidateId], target);
        vis_records.push([labels[curNodeId], labels[candidateId], dist]);
        if (dist < curDist) {
          curDist = dist;
          curNodeId = candidateId;
          changed = true;
        }
      });
    }
    vis_records_all.push(vis_records);
  }

  const hasDeleted = numDeleted > 0;
  const { top_candidates, vis_records_level_0 } = searchLevelO({
    ep_id: curNodeId,
    target,
    vectors,
    ef: Math.max(ef, k),
    hasDeleted,
    linkLists_level_0,
    disfunc,
    labels,
  });
  vis_records_all.push(vis_records_level_0);

  while (top_candidates.size > k) {
    top_candidates.pop();
  }

  while (top_candidates.size > 0) {
    const res = top_candidates.pop();
    topkResults.push({
      id: labels[res[1]],
      internalId: res[1],
      dis: -res[0],
    });
  }

  topkResults = topkResults.reverse();

  return { vis_records: vis_records_all, topkResults, searchParams: { k, ef } };
};

export default hnswlibHNSWSearch;
