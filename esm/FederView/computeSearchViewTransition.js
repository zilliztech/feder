import {
  getNodeIdWithLevel,
  getLinkIdWithLevel,
  getEntryLinkIdWithLevel,
} from '../Utils/index.js';

import { HNSW_LINK_TYPE } from '../Utils/config.js';

export const computeSearchViewTransition = ({
  linksLevels,
  entryNodesLevels,
  interLevelGap = 1000,
  intraLevelGap = 300,
}) => {
  let currentTime = 0;
  const targetShowTime = [];
  const nodeShowTime = {};
  const linkShowTime = {};

  let isPreLinkImportant = true;
  let isSourceChanged = true;
  let preSourceIdWithLevel = '';
  for (let level = linksLevels.length - 1; level >= 0; level--) {
    const links = linksLevels[level];
    if (links.length === 0) {
      const sourceId = entryNodesLevels[level].id;
      const sourceIdWithLevel = getNodeIdWithLevel(sourceId, level);
      nodeShowTime[sourceIdWithLevel] = currentTime;
    } else {
      links.forEach((link) => {
        const sourceId = link.source.id;
        const targetId = link.target.id;
        const sourceIdWithLevel = getNodeIdWithLevel(sourceId, level);
        const targetIdWithLevel = getNodeIdWithLevel(targetId, level);
        const linkIdWithLevel = getLinkIdWithLevel(sourceId, targetId, level);
        const isCurrentLinkImportant =
          link.type === HNSW_LINK_TYPE.Searched ||
          link.type === HNSW_LINK_TYPE.Fine;
        isSourceChanged = preSourceIdWithLevel !== sourceIdWithLevel;

        const isSourceEntry = !(sourceIdWithLevel in nodeShowTime);
        if (isSourceEntry) {
          if (level < linksLevels.length - 1) {
            const entryLinkIdWithLevel = getEntryLinkIdWithLevel(
              sourceId,
              level
            );
            linkShowTime[entryLinkIdWithLevel] = currentTime;
            const targetLinkIdWithLevel = getEntryLinkIdWithLevel(
              'target',
              level
            );
            linkShowTime[targetLinkIdWithLevel] = currentTime;
            currentTime += interLevelGap;
            isPreLinkImportant = true;
          }
          targetShowTime[level] = currentTime;
          nodeShowTime[sourceIdWithLevel] = currentTime;
        }

        // something wrong
        if (isPreLinkImportant || isCurrentLinkImportant || isSourceChanged) {
          currentTime += intraLevelGap;
        } else {
          currentTime += intraLevelGap * 0.5;
        }

        linkShowTime[linkIdWithLevel] = currentTime;

        if (!(targetIdWithLevel in nodeShowTime)) {
          nodeShowTime[targetIdWithLevel] = currentTime += intraLevelGap;
        }

        isPreLinkImportant = isCurrentLinkImportant;
        preSourceIdWithLevel = sourceIdWithLevel;
      });
    }

    currentTime += intraLevelGap;
    isPreLinkImportant = true;
    isSourceChanged = true;
  }
  return { targetShowTime, nodeShowTime, linkShowTime, duration: currentTime };
};

export default computeSearchViewTransition;
