import * as d3 from 'd3';
import transformHandler from './transformHandler';

export const overviewLayoutHandler = ({
  overviewNodes,
  overviewLevelCount,
  width,
  height,
  padding,
  forceIterations,
  M,
}) => {
  return new Promise(async (resolve) => {
    const overviewNodesLevels = [];
    const overviewLinksLevels = [];
    for (let level = overviewLevelCount - 1; level >= 0; level--) {
      const nodes = overviewNodes.filter(
        (node) => node.linksLevels.length > level
      );
      const links = nodes.reduce(
        (acc, curNode) =>
          acc.concat(
            curNode.linksLevels[level].map((targetNodeInternalId) => ({
              source: curNode.internalId,
              target: targetNodeInternalId,
            }))
          ),
        []
      );
      await forceLevel({ nodes, links, forceIterations });
      level > 0 && scaleNodes({ nodes, M });
      level > 0 && fixedCurLevel({ nodes });
      overviewNodesLevels[level] = nodes;
      overviewLinksLevels[level] = links;
    }

    const { layerPosLevels: overviewLayerPosLevels, transformFunc } =
      transformHandler(overviewNodes, {
        levelCount: overviewLevelCount,
        width,
        height,
        padding,
      });

    overviewNodes.forEach((node) => {
      node.overviewPosLevels = node.linksLevels.map((_, level) =>
        transformFunc(node.x, node.y, level)
      );
      node.r = node.linksLevels.length * 0.8 + 1;
    });

    resolve({
      overviewLayerPosLevels,
      overviewNodesLevels,
      overviewLinksLevels,
    });
  });
};

export default overviewLayoutHandler;

export const forceLevel = ({ nodes, links, forceIterations }) => {
  return new Promise((resolve) => {
    const simulation = d3
      .forceSimulation(nodes)
      .alphaDecay(1 - Math.pow(0.001, (1 / forceIterations) * 2))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.internalId)
          .strength(1)
      )
      .force('center', d3.forceCenter(0, 0))
      .force('charge', d3.forceManyBody().strength(-500))
      .on('end', () => {
        resolve();
      });
  });
};

export const scaleNodes = ({ nodes, M }) => {
  const xRange = d3.extent(nodes, (node) => node.x);
  const yRange = d3.extent(nodes, (node) => node.y);

  const isXLonger = xRange[1] - xRange[0] > yRange[1] - yRange[0];
  if (!isXLonger) {
    nodes.forEach((node) => ([node.x, node.y] = [node.y, node.x]));
  }

  const t = Math.sqrt(M) * 0.85;
  nodes.forEach((node) => {
    node.x = node.x * t;
    node.y = node.y * t;
  });
};

export const fixedCurLevel = ({ nodes }) => {
  nodes.forEach((node) => {
    node.fx = node.x;
    node.fy = node.y;
  });
};
