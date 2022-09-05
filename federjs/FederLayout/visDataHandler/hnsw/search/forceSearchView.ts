import * as d3 from 'd3';
import { EHnswLinkType, TCoord, TId } from 'Types';
import { TVisDataHnswLink, TVisDataHnswParsedDataLevel } from 'Types/visData';
import { deDupLink } from '../utils';

const forceSearchView = (
  parsedData: TVisDataHnswParsedDataLevel[],
  targetOrigin = [0, 0],
  numForceIterations = 100
): Promise<{ [id: TId]: TCoord }> => {
  return new Promise((resolve) => {
    const nodeId2dist = {} as { [id: TId]: number };
    parsedData.forEach((levelData) =>
      levelData.nodes.forEach((node) => (nodeId2dist[node.id] = node.dist || 0))
    );
    const nodeIds = Object.keys(nodeId2dist);
    const nodes = nodeIds.map((nodeId) => ({
      nodeId: nodeId,
      dist: nodeId2dist[nodeId],
    }));

    const linksAll = parsedData.reduce((acc, cur) => acc.concat(cur.links), []);
    const links = deDupLink(linksAll) as TVisDataHnswLink[];
    // console.log(nodes, links);
    // console.log(links.length, linksAll.length);

    const targetNode = {
      nodeId: 'target',
      dist: 0,
      fx: targetOrigin[0],
      fy: targetOrigin[1],
    };
    nodes.push(targetNode);

    const targetLinks = parsedData[0].fineIds.map((fineId) => ({
      source: `${fineId}`,
      target: 'target',
      type: EHnswLinkType.None,
    }));
    links.push(...targetLinks);
    // console.log(nodes, links);

    const rScale = d3
      .scaleLinear()
      .domain(
        d3.extent(
          nodes.filter((node) => node.dist > 0),
          (node) => node.dist
        )
      )
      .range([10, 1000])
      .clamp(true);
    const simulation = d3
      .forceSimulation(nodes as any[])
      .alphaDecay(1 - Math.pow(0.001, 1 / numForceIterations))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => `${d.nodeId}`)
          .strength((d) => (d.type === EHnswLinkType.None ? 2 : 0.4))
      )
      .force(
        'r',
        d3
          .forceRadial(
            (node: any) => rScale(node.dist),
            targetOrigin[0],
            targetOrigin[1]
          )
          .strength(1)
      )
      .force('charge', d3.forceManyBody().strength(-10000))
      .on('end', () => {
        const id2forcePos = {} as { [id: TId]: TCoord };
        nodes.forEach(
          (node: any) => (id2forcePos[node.nodeId] = [node.x, node.y])
        );
        resolve(id2forcePos);
      });
  });
};

export default forceSearchView;
