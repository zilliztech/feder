import PriorityQueue from 'Utils/PriorityQueue';

export const searchLevelO = ({
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

export default searchLevelO;
