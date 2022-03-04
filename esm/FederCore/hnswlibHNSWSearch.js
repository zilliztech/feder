import { getDisFunc } from './distance.js';
import { MetricType } from './faissConfig.js';
import PriorityQueue from '../Utils/PriorityQueue.js';

const hnswlibHNSWSearch = ({ index, target, params = {} }) => {
  const { ef = 10, k = 8, metricType = MetricType.METRIC_L2 } = params;
  const disfunc = getDisFunc(metricType);
  // console.log(index, target, params);

  let result = [];

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
  console.log(curNodeId, curDist);

  for (let level = maxLevel - 1; level > 0; level--) {
    let changed = true;
    while (changed) {
      changed = false;

      curlinks = linkLists_levels[curNodeId][level - 1];

      curlinks.forEach((candidateId) => {
        const dist = disfunc(vectors[candidateId], target);
        if (dist < curDist) {
          curDist = dist;
          curNodeId = candidateId;
          changed = true;
        }
      });
      console.log(curNodeId, curDist, changed, level);
    }
  }

  const hasDeleted = numDeleted > 0;
  const top_candidates = searchLevelO({
    ep_id: curNodeId,
    target,
    vectors,
    ef: Math.max(ef, k),
    hasDeleted,
    linkLists_level_0,
    disfunc,
  });

  while (top_candidates.size > k) {
    top_candidates.pop();
  }

  while (top_candidates.size > 0) {
    const res = top_candidates.pop();
    result.push({
      id: labels[res[1]],
      dis: -res[0],
    });
  }

  result = result.reverse();
  console.log(result);

  return '';
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
}) => {
  const top_candidates = new PriorityQueue([], (d) => d[0]);
  const candidates = new PriorityQueue([], (d) => d[0]);

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
      }
    });

    return top_candidates;
  }
};
