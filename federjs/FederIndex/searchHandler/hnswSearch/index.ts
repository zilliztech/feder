import { getDisFunc } from "Utils/distFunc";
import { EMetricType, TSearchParams } from "Types";
import { TSearchRecordsHnsw } from "Types/searchRecords";
import searchLevelO from "./searchLevel0";

export const hnswlibHNSWSearch = ({
  index,
  target,
  params = {} as TSearchParams,
}) => {
  const { ef = 10, k = 8, metricType = EMetricType.METRIC_L2 } = params;
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
    isDeleted,
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
    isDeleted,
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

  return {
    searchRecords: vis_records_all,
    topkResults,
    searchParams: { k, ef },
  } as TSearchRecordsHnsw;
};
