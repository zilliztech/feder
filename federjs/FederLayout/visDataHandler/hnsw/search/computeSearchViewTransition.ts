import {
  getNodeIdWithLevel,
  getLinkIdWithLevel,
  getEntryLinkIdWithLevel,
} from './utils';

import { EHnswLinkType, TId } from 'Types';
import { TId2ShowTime, TVisDataHnswLink, TVisDataHnswNode } from 'Types/visData';

export const computeSearchViewTransition = ({
  linksLevels,
  entryNodesLevels,
  interLevelGap = 1000,
  intraLevelGap = 300,
}: {
  linksLevels: TVisDataHnswLink[][];
  entryNodesLevels: TVisDataHnswNode[][];
  interLevelGap: number;
  intraLevelGap: number;
}) => {
  let currentTime = 0;
  const targetShowTime = [] as number[];
  const nodeShowTime = {} as TId2ShowTime;
  const linkShowTime = {} as TId2ShowTime;

  let isPreLinkImportant = true;
  let isSourceChanged = true;
  let preSourceIdWithLevel = '';
  for (let level = linksLevels.length - 1; level >= 0; level--) {
    const links = linksLevels[level];
    if (links.length === 0) {
      const sourceId = entryNodesLevels[level][0].id;
      const sourceIdWithLevel = getNodeIdWithLevel(sourceId, level);
      nodeShowTime[sourceIdWithLevel] = currentTime;
    } else {
      links.forEach((link) => {
        const sourceIdWithLevel = getNodeIdWithLevel(link.source, level);
        const targetIdWithLevel = getNodeIdWithLevel(link.target, level);
        const linkIdWithLevel = getLinkIdWithLevel(link.source, link.target, level);
        const isCurrentLinkImportant =
          link.type === EHnswLinkType.Searched ||
          link.type === EHnswLinkType.Fine;
        isSourceChanged = preSourceIdWithLevel !== sourceIdWithLevel;

        const isSourceEntry = !(sourceIdWithLevel in nodeShowTime);
        if (isSourceEntry) {
          if (level < linksLevels.length - 1) {
            const entryLinkIdWithLevel = getEntryLinkIdWithLevel(
              link.source,
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
