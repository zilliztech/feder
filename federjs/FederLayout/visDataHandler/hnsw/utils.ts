import { TId } from 'Types';

const connection = '---';

export const getLinkId = (sourceId: TId, targetId: TId) =>
  `${sourceId}${connection}${targetId}`;

export const parseLinkId = (linkId: string) =>
  linkId.split(connection).map((d) => +d);

export const getLinkIdWithLevel = (
  sourceId: TId,
  targetId: TId,
  level: number
) => `link-${level}-${sourceId}-${targetId}`;

export const getNodeIdWithLevel = (nodeId: TId, level: number) =>
  `node-${level}-${nodeId}`;

export const parseNodeIdWidthLevel = (idWithLevel: string) => {
  const idString = idWithLevel.split('-');
  return [+idString[1], idString[2]] as [number, TId];
};

export const getEntryLinkIdWithLevel = (nodeId: TId | string, level: number) =>
  `inter-level-${level}-${nodeId}`;

export const deDupLink = (
  links: any[],
  source = 'source',
  target = 'target'
) => {
  const linkStringSet = new Set();
  return links.filter((link) => {
    const linkString = `${link[source]}---${link[target]}`;
    const linkStringReverse = `${link[target]}---${link[source]}`;
    if (linkStringSet.has(linkString) || linkStringSet.has(linkStringReverse)) {
      return false;
    } else {
      linkStringSet.add(linkString);
      return true;
    }
  });
};
