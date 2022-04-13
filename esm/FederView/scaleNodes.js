import * as d3 from 'd3';

const scaleNodes = ({ nodes, M }) => {
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

export default scaleNodes;
