import * as d3 from 'd3';

export default function SVFineProjectHandler(
  searchRes,
  searchViewLayoutData,
  federView
) {
  const { nodes, targetNode } = searchViewLayoutData;
  const { projectPadding, width, height } = federView;
  if (!nodes[0].projection) {
    console.log('No Projection Data. Should use "fineWithProjection".');
    nodes.forEach((node) => {
      node.projection = [Math.random(), Math.random()];
    });
  }
  const xRange = targetNode.isLeft_coarseLevel
    ? [projectPadding[1], width - projectPadding[3]]
    : [projectPadding[3], width - projectPadding[1]];
  const x = d3
    .scaleLinear()
    .domain(d3.extent(nodes, (node) => node.projection[0]))
    .range(xRange);
  const y = d3
    .scaleLinear()
    .domain(d3.extent(nodes, (node) => node.projection[1]))
    .range([projectPadding[0], height - projectPadding[2]]);
  nodes.forEach((node) => {
    node.projectPos = [x(node.projection[0]), y(node.projection[1])];
  });
}
