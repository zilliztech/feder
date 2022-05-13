import { HNSW_NODE_TYPE, HNSW_LINK_TYPE } from 'Types';
import { getLinkId, parseLinkId } from 'Utils';

export const parseVisRecords = ({ topkResults, vis_records }) => {
  const visData = [];
  const numLevels = vis_records.length;
  let fineIds = topkResults.map((d) => d.id);
  let entryId = -1;
  for (let i = numLevels - 1; i >= 0; i--) {
    const level = numLevels - 1 - i;
    if (level > 0) {
      fineIds = [entryId];
    }

    const visRecordsLevel = vis_records[i];

    const id2nodeType = {};
    const linkId2linkType = {};
    const updateNodeType = (nodeId, type) => {
      if (id2nodeType[nodeId]) {
        id2nodeType[nodeId] = Math.max(id2nodeType[nodeId], type);
      } else {
        id2nodeType[nodeId] = type;
      }
    };
    const updateLinkType = (sourceId, targetId, type) => {
      const linkId = getLinkId(sourceId, targetId, type);
      if (linkId2linkType[linkId]) {
        linkId2linkType[linkId] = Math.max(linkId2linkType[linkId], type);
      } else {
        linkId2linkType[linkId] = type;
      }
    };
    const id2dist = {};
    const sourceMap = {};

    visRecordsLevel.forEach((record) => {
      const [sourceId, targetId, dist] = record;

      if (sourceId === targetId) {
        // entry
        entryId = targetId;
        id2dist[targetId] = dist;
      } else {
        updateNodeType(sourceId, HNSW_NODE_TYPE.Candidate);
        updateNodeType(targetId, HNSW_NODE_TYPE.Coarse);

        if (id2dist[targetId] >= 0) {
          // visited
          updateLinkType(sourceId, targetId, HNSW_LINK_TYPE.Visited);
        } else {
          // not visited
          id2dist[targetId] = dist;
          updateLinkType(sourceId, targetId, HNSW_LINK_TYPE.Extended);

          sourceMap[targetId] = sourceId;

          // only level-0 have "link_type - search"
          if (level === 0) {
            const preSourceId = sourceMap[sourceId];
            if (preSourceId >= 0) {
              updateLinkType(preSourceId, sourceId, HNSW_LINK_TYPE.Searched);
            }
          }
        }
      }
    });

    fineIds.forEach((fineId) => {
      updateNodeType(fineId, HNSW_NODE_TYPE.Fine);

      let t = fineId;
      while (t in sourceMap) {
        let s = sourceMap[t];
        updateLinkType(s, t, HNSW_LINK_TYPE.Fine);
        t = s;
      }
    });

    const nodes = Object.keys(id2nodeType).map((id) => ({
      id: `${id}`,
      type: id2nodeType[id],
      dist: id2dist[id],
    }));
    const links = Object.keys(linkId2linkType).map((linkId) => {
      const [source, target] = parseLinkId(linkId);
      return {
        source: `${source}`,
        target: `${target}`,
        type: linkId2linkType[linkId],
      };
    });
    const visDataLevel = {
      entryIds: [`${entryId}`],
      fineIds: fineIds.map((id) => `${id}`),
      links,
      nodes,
    };
    visData.push(visDataLevel);
  }

  return visData;
};

export default parseVisRecords;
