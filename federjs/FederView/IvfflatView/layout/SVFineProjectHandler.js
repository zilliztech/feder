import * as d3 from 'd3';

export default function SVFineProjectHandler() {
  const nodes = this.nodes;
  if (!nodes[0].projection) {
    console.log('No Projection Data. Should use "fineWithProjection".');
    nodes.forEach((node) => {
      node.projection = [Math.random(), Math.random()];
    });
  }
  const xRange = this.targetNode.isLeft_coarseLevel
    ? [this.projectPadding[1], this.width - this.projectPadding[3]]
    : [this.projectPadding[3], this.width - this.projectPadding[1]];
  const x = d3
    .scaleLinear()
    .domain(d3.extent(nodes, (node) => node.projection[0]))
    .range(xRange);
  const y = d3
    .scaleLinear()
    .domain(d3.extent(nodes, (node) => node.projection[1]))
    .range([this.projectPadding[0], this.height - this.projectPadding[2]]);
  nodes.forEach((node) => {
    node.projectPos = [x(node.projection[0]), y(node.projection[1])];
  });
}
