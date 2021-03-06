import * as d3 from 'd3';
import { HNSW_LINK_TYPE } from 'Types';
import { deDupLink } from 'Utils';

const forceSearchView = (
  visData,
  targetOrigin = [0, 0],
  forceIterations = 100
) => {
  return new Promise((resolve) => {
    const nodeId2dist = {};
    visData.forEach((levelData) =>
      levelData.nodes.forEach((node) => (nodeId2dist[node.id] = node.dist || 0))
    );
    const nodeIds = Object.keys(nodeId2dist);
    const nodes = nodeIds.map((nodeId) => ({
      nodeId: nodeId,
      dist: nodeId2dist[nodeId],
    }));

    const linksAll = visData.reduce((acc, cur) => acc.concat(cur.links), []);
    const links = deDupLink(linksAll);
    // console.log(nodes, links);
    // console.log(links.length, linksAll.length);

    const targetNode = {
      nodeId: 'target',
      dist: 0,
      fx: targetOrigin[0],
      fy: targetOrigin[1],
    };
    nodes.push(targetNode);

    const targetLinks = visData[0].fineIds.map((fineId) => ({
      source: `${fineId}`,
      target: 'target',
      type: HNSW_LINK_TYPE.None,
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
      .forceSimulation(nodes)
      .alphaDecay(1 - Math.pow(0.001, 1 / forceIterations))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => `${d.nodeId}`)
          .strength((d) => (d.type === HNSW_LINK_TYPE.None ? 2 : 0.4))
      )
      .force(
        'r',
        d3
          .forceRadial(
            (node) => rScale(node.dist),
            targetOrigin[0],
            targetOrigin[1]
          )
          .strength(1)
      )
      .force('charge', d3.forceManyBody().strength(-10000))
      .on('end', () => {
        const id2forcePos = {};
        nodes.forEach((node) => (id2forcePos[node.nodeId] = [node.x, node.y]));
        resolve(id2forcePos);
      });
  });
};

export default forceSearchView;
