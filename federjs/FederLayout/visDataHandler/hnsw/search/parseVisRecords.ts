import { EHnswNodeType, EHnswLinkType, TId } from 'Types';
import { TSearchRecordsHnsw } from 'Types/searchRecords';
import {
  TVisDataHnswLink,
  TVisDataHnswNode,
  TVisDataHnswParsedDataLevel,
} from 'Types/visData';
import { getLinkId, parseLinkId } from '../utils';

export const parseVisRecords = ({
  topkResults,
  searchRecords,
}: TSearchRecordsHnsw) => {
  const visData = [] as TVisDataHnswParsedDataLevel[];
  const numLevels = searchRecords.length;
  let fineIds = topkResults.map((d) => d.id);
  let entryId = -1 as TId;
  for (let i = numLevels - 1; i >= 0; i--) {
    const level = numLevels - 1 - i;
    if (level > 0) {
      fineIds = [entryId];
    }

    const visRecordsLevel = searchRecords[i];

    const id2nodeType = {} as { [id: TId]: EHnswNodeType };
    const linkId2linkType = {} as { [linkid: TId]: EHnswLinkType };
    const updateNodeType = (nodeId: TId, type: EHnswNodeType) => {
      if (id2nodeType[nodeId]) {
        id2nodeType[nodeId] = Math.max(id2nodeType[nodeId], type);
      } else {
        id2nodeType[nodeId] = type;
      }
    };
    const updateLinkType = (
      sourceId: TId,
      targetId: TId,
      type: EHnswLinkType
    ) => {
      const linkId = getLinkId(sourceId, targetId);
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
        updateNodeType(sourceId, EHnswNodeType.Candidate);
        updateNodeType(targetId, EHnswNodeType.Coarse);

        if (id2dist[targetId] >= 0) {
          // visited
          updateLinkType(sourceId, targetId, EHnswLinkType.Visited);
        } else {
          // not visited
          id2dist[targetId] = dist;
          updateLinkType(sourceId, targetId, EHnswLinkType.Extended);

          sourceMap[targetId] = sourceId;

          // only level-0 have "link_type - search"
          if (level === 0) {
            const preSourceId = sourceMap[sourceId];
            if (preSourceId >= 0) {
              updateLinkType(preSourceId, sourceId, EHnswLinkType.Searched);
            }
          }
        }
      }
    });

    fineIds.forEach((fineId) => {
      updateNodeType(fineId, EHnswNodeType.Fine);

      let t = fineId;
      while (t in sourceMap) {
        let s = sourceMap[t];
        updateLinkType(s, t, EHnswLinkType.Fine);
        t = s;
      }
    });

    const nodes = Object.keys(id2nodeType).map(
      (id) =>
        ({
          id: id,
          type: id2nodeType[id],
          dist: id2dist[id],
          source: sourceMap[id],
        } as TVisDataHnswNode)
    );
    const links = Object.keys(linkId2linkType).map((linkId) => {
      const [source, target] = parseLinkId(linkId);
      return {
        source: `${source}`,
        target: `${target}`,
        type: linkId2linkType[linkId],
      } as TVisDataHnswLink;
    });
    const visDataLevel = {
      entryIds: [`${entryId}`],
      fineIds: fineIds.map((id) => `${id}`),
      links,
      nodes,
    } as TVisDataHnswParsedDataLevel;
    visData.push(visDataLevel);
  }

  return visData;
};

export default parseVisRecords;
