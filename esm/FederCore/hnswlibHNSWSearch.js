import { getDisFunc } from './distance.js';
import { MetricType } from './faissConfig.js';
import PriorityQueue from '../Utils/PriorityQueue.js';

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

      curlinks = linkLists_levels[curNodeId][level - 1];

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

const searchLevelO = ({
  ep_id,
  target,
  vectors,
  ef,
  isDeleted,
  hasDeleted,
  linkLists_level_0,
  disfunc,
  labels,
}) => {
  const top_candidates = new PriorityQueue([], (d) => d[0]);
  const candidates = new PriorityQueue([], (d) => d[0]);
  const vis_records_level_0 = [];

  const visited = new Set();

  let lowerBound;
  if (!hasDeleted || !isDeleted[ep_id]) {
    const dist = disfunc(vectors[ep_id], target);
    lowerBound = dist;
    top_candidates.add([-dist, ep_id]);
    candidates.add([dist, ep_id]);
  } else {
    lowerBound = 9999999;
    candidates.add([lowerBound, ep_id]);
  }

  visited.add(ep_id);
  vis_records_level_0.push([labels[ep_id], labels[ep_id], lowerBound]);

  while (!candidates.isEmpty) {
    const curNodePair = candidates.top;
    if (
      curNodePair[0] > lowerBound &&
      (top_candidates.size === ef || !hasDeleted)
    ) {
      break;
    }
    candidates.pop();

    const curNodeId = curNodePair[1];
    const curLinks = linkLists_level_0[curNodeId];

    curLinks.forEach((candidateId) => {
      if (!visited.has(candidateId)) {
        visited.add(candidateId);

        const dist = disfunc(vectors[candidateId], target);
        vis_records_level_0.push([
          labels[curNodeId],
          labels[candidateId],
          dist,
        ]);

        if (top_candidates.size < ef || lowerBound > dist) {
          candidates.add([dist, candidateId]);

          if (!hasDeleted || !isDeleted(candidateId)) {
            top_candidates.add([-dist, candidateId]);
          }

          if (top_candidates.size > ef) {
            top_candidates.pop();
          }

          if (!top_candidates.isEmpty) {
            lowerBound = -top_candidates.top[0];
          }
        }
      } else {
        vis_records_level_0.push([labels[curNodeId], labels[candidateId], -1]);
      }
    });
  }
  return { top_candidates, vis_records_level_0 };
};
